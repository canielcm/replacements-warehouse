const Loss = require("../models/loss.model");
const Provider = require("../models/provider.model");
const Product = require("../models/product.model");
const Response = require("./ResponsesModel");
const mongoose = require("mongoose");
const assert = require("assert");
const { getItems, getItem } = require("../helpers/mongoDBFunctions");
const {
  getProductsDataArray,
  getTotalPrice,
} = require("../helpers/businessMethods");

const makeLoss = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session };
  try {
    /*
    {
      "reason": xxxxx,
      "products": [{idProduct: xxxx, amount: 20}],
      "totalLost"
    }
    */
    const { reason, products } = req.body;
    if (!products || products.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json("no products in the request");
    }
    const total = await getTotalPrice(products, 0);
    const totalLost = total.totalPrice;
    const productsLostData = await getProductsDataArray(products);
    const amountsOutOfStockProducts = [];
    productsLostData.forEach((e) => {
      if (e.amount > e.amountAvailable) {
        let { name, id, amount: amountRequired, amountAvailable } = e;
        amountsOutOfStockProducts.push({
          name,
          id,
          amountRequired,
          amountAvailable,
        });
      }
    });
    if (amountsOutOfStockProducts.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json(
          Response._400(
            "You are picking some products with amounts out of stock",
            null,
            amountsOutOfStockProducts
          )
        );
    }
    const productsLost = productsLostData.map(e=> {
        const {amountAvailable,...rest}= e;
        return rest;
    })
    const myLosses = await Loss.create(
      [
        {
          reason,
          products: productsLost,
          totalLost,
        },
      ],
      opts
    );
    assert(myLosses, "There are problemens registering losses to DB");
    for (const product of products) {
      await Product.findByIdAndUpdate(
        product.idProduct,
        { $inc: { amount: -product.amount } },
        opts
      );
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).json(Response._200(myLosses));
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json(Response._500(error));
  }
};

//GET LOSS
const lossGet = async (req, res) => {
  try {
    const { id } = req.params;
    const loss = await getItems(Loss, id);
    loss
      ? res.status(200).json(Response._200(loss))
      : res.status(404).json(Response._404("Loss not found"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//GET ALL LOSSS OR LOOK FOR THEM BY ATTRIBUTES
const lossesGet = async (req, res) => {
  try {
    const query = req.query;
    let losss;
    if (query) {
      losss = await getItems(Loss, null, query);
      losss
        ? res.status(200).json(Response._200(losss))
        : res.status(404).json(Response._404("NO losss found"));
    } else {
      losss = await getItems(Loss);
      losss
        ? res.status(200).json(Response._200(losss))
        : res.status(404).json(Response._404("Losss not found"));
    }
  } catch (error) {
    res.status(400).json(Response._500(error));
  }
};

module.exports = {
  makeLoss,
  lossGet,
  lossesGet,
};
