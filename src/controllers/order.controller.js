const Order = require("../models/order.model");
const Customer = require("../models/customer.model");
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


const makeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session}
  try {
      const { idCustomer, products, discount = 0 } = req.body;
      const customer = await getItem(Customer, idCustomer);
      if (!customer) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json(Response._400("Customer not found"));
      }
      if (!products || products.length === 0) {
        await session.abortTransaction();
        session.endSession(); 
        return res.status(400).json(Response._400("no products in the request"));
      }
      const total = await getTotalPrice(products, discount);
      const productsOrderData = await getProductsDataArray(products);
      const amountsOutOfStockProducts = [];
      productsOrderData.forEach(e=>{
        if(e.amount>e.amountAvailable){
          let {name, id, amount:amountRequired, amountAvailable} = e;
          amountsOutOfStockProducts.push({name, id, amountRequired, amountAvailable})
        }
      })
      if(amountsOutOfStockProducts.length>0){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json(Response._400("You are requiring some products with amounts out of stock", null, amountsOutOfStockProducts));
      }
      const myOrder = await Order.create(
        [
          {
            customer,
            ...total,
            products: productsOrderData,
            discount,
          },
        ],
        opts
      );
      assert.ok(myOrder, "There are problems adding the order to DB")
      for(const product of products){
        await Product.findByIdAndUpdate(product.idProduct,{$inc:{amount: -product.amount}}, opts);
      }
      await session.commitTransaction();
      session.endSession();
      res.status(200).json(Response._200(myOrder));
  } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json(Response._500(error));
  }
};

//GET ORDER
const orderGet = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getItems(Order, id);
    order
      ? res.status(200).json(Response._200(order))
      : res.status(404).json(Response._404("Order not found"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//GET ALL ORDERS OR LOOK FOR THEM BY ATTRIBUTES
const ordersGet = async (req, res) => {
  try {
    const query = req.query;
    let orders;
    if (query) {
      orders = await getItems(Order, null, query);
      orders
        ? res.status(200).json(Response._200(orders))
        : res.status(404).json(Response._404("NO orders found"));
    } else {
      orders = await getItems(Order);
      orders
        ? res.status(200).json(Response._200(orders))
        : res.status(404).json(Response._404("Orders not found"));
    }
  } catch (error) {
    res.status(400).json(Response._500(error));
  }
};

module.exports = {
  makeOrder,
  orderGet,
  ordersGet
};
