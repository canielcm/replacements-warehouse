const Response = require("./ResponsesModel");
const Product = require("../models/product.model");
const {
  getItems,
  addToDB,
  uptateItem,
  deleteItem,
} = require("../helpers/mongoDBFunctions");

//TODO:
const generateQR = (data) => {};

//GET PRODUCT
const productGet = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getItems(Product, id);
    product
      ? res.status(200).json(Response._200(product))
      : res.status(404).json(Response._404("Product not found"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//GET ALL PRODUCTS OR LOOK FOR THEM BY ATTRIBUTES
const productsGet = async (req, res) => {
  try {
    const query = req.query;
    let products;
    if (query) {
      products = await getItems(Product, null, query);
      products
        ? res.status(200).json(Response._200(products))
        : res.status(404).json(Response._404("NO products found"));
    } else {
      products = await getItems(Product);
      products
        ? res.status(200).json(Response._200(products))
        : res.status(404).json(Response._404("Products not found"));
    }
  } catch (error) {
    res.status(400).json(Response._500(error));
  }
};

//ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    let body = req.body;
    let data = await addToDB(Product, body);
    return res.status(200).json(Response._200(data));
  } catch (error) {
    return res.status(400).json(Response._500(error));
  }
};

//UPDATE PRODUCT
const productPut = async (req, res) => {
  const { id } = req.params;
  let { _id, QR, SKU, ...rest } = req.body;
  let product = await uptateItem(Product, id, rest);
  const newProductData = rest;
  const newProduct = {
    ...product._doc,
    ...newProductData
  }
  res.status(200).json(
    Response._200(
      {
        id,
        newProduct
      },
      "product updated"
    )
  );
};

//DELETE PRODUCT
const productDelete = async (req, res) => {
  try {
    const id = req.params.id;
    let productDeleted = await deleteItem(Product, id);
    productDeleted
      ? res.status(200).json(Response._200(productDeleted, "product was deleted"))
      : res.status(404).json(Response._404("product not deleted"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//DISABLE PRODUCT
const productDisable = async (req, res) => {
  try {
    const id = req.params.id;
    let product = await uptateItem(Product, id, { status: false });
    res
      .status(200)
      .json(
        Response._200(
          { productDeleted: product },
          `Now product ${product._id} is disabled`
        )
      );
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

module.exports = {
  addProduct,
  productGet,
  productsGet,
  productPut,
  productDelete,
  productDisable,
};