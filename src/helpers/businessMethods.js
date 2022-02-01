const Product = require("../models/product.model");
const { getItem } = require("./mongoDBFunctions");

const getDiscount = (initialPrice, discount) => {
  let price = initialPrice - initialPrice * discount;
  const remainder  = price%50!=0;
  if(remainder!=0){
    price=price-remainder+50;
  }
  return price;
};
const getTotalPrice = async (products, discount) => {
  try {
    let totalPrice = 0;
    for (const e of products) {
      let product = await getItem(Product, e.idProduct);
      let price = product.price * e.amount;
      totalPrice += price;
    }
    const data = {
      totalPrice,
      totalToPay: getDiscount(totalPrice, discount),
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProductsDataArray = async (products) => {
  try {
    const productsData = [];
    for (const product of products) {
      if(product.amount>0){
        const productInfo = await getItem(Product, product.idProduct);
        productInfo.amountAvailable = productInfo.amount;
        productInfo.amount = product.amount;
        productInfo.codes = product.codes;
        productInfo.total = productInfo.amount * productInfo.price;
        const {
          _id: id,
          SKU,
          name,
          amount,
          codes,
          total,
          amountAvailable,
        } = productInfo;
        productsData.push({
          id,
          SKU,
          name,
          amount,
          codes,
          total,
          amountAvailable,
        });
      }
    }
    return productsData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDiscount,
  getTotalPrice,
  getProductsDataArray,
};
