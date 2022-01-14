const Response = require("./ResponsesModel");
const { addToDB } = require("../helpers/mongoDBFunctions");
const Product = require("../models/product.model");

const addProduct = async (req, res) => {
  try {
    let body = req.body;
    let data = await addToDB(Product, body);
    return res.status(200).json(Response._200(data));
  } catch (error) {
    return res.status(400).json(Response._500(error));
  }
};

module.exports = {
  addProduct
};
