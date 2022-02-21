const Purchase = require("../models/purchase.model");
const Provider = require("../models/provider.model");
const Product = require("../models/product.model");
const Response = require("./ResponsesModel");
const mongoose = require("mongoose");
const assert = require("assert");
const {
  addToDB,
  getItems,
  uptateItem,
  getItem,
} = require("../helpers/mongoDBFunctions");
const {
  getTotalPrice,
  getProductsDataArray,
} = require("../helpers/businessMethods");

const makePurchase = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session}
  try {
    /*
    {
      idProvider: xxxxx,
      products: [{idProduct: xxxx, amount: 20, total: 500000}],
      paymentOption: "Electronic bank transfers",
      paymentMethod: "partial payment-2 instalments" 
    }
    */
    const {idProvider, products, paymentOption, paymentMethod} = req.body;
    const provider = await getItem(Provider, idProvider);
    if(!provider){
      await abortTransaction();
      session.endSession();
      return res.status(400).json("Provider not found");
    }
    if (!products || products.length ===0){
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json('no products in the request');
    }
    let totalToPay = products.reduce((accumulator, element)=>accumulator+element.total, 0);
    const productsOrderData = await getProductsDataArray(products);

    const myPurchase = await Purchase.create(
      [
        {
          provider,
          products: productsOrderData,
          totalToPay,
          paymentOption,
          paymentMethod
        }
      ],
      opts
    )
    assert.ok(myPurchase, "There are problems adding the purchase to DB")
    for(const product of products){
      await Product.findByIdAndUpdate(product.idProduct,{$inc:{amount: product.amount}}, opts);
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).json(Response._200(myPurchase));
  } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json(Response._500(error));
  }
};

//GET PURCHASE
const purchaseGet = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await getItems(Purchase, id);
    purchase
      ? res.status(200).json(Response._200(purchase))
      : res.status(404).json(Response._404("Purchase not found"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//GET ALL PURCHASES OR LOOK FOR THEM BY ATTRIBUTES
const purchasesGet = async (req, res) => {
  try {
    const query = req.query;
    let purchases;
    if (query) {
      purchases = await getItems(Purchase, null, query);
      purchases
        ? res.status(200).json(Response._200(purchases))
        : res.status(404).json(Response._404("NO purchases found"));
    } else {
      purchases = await getItems(Purchase);
      purchases
        ? res.status(200).json(Response._200(purchases))
        : res.status(404).json(Response._404("Purchases not found"));
    }
  } catch (error) {
    res.status(400).json(Response._500(error));
  }
};

module.exports = {
  makePurchase,
  purchaseGet,
  purchasesGet
};
