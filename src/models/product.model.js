const { Schema, model } = require("mongoose");
const { stringSchema, numberSchema } = require("./SchemaTypeModels");

const ProductSchema = Schema({
  name: stringSchema(null, true),

  price: numberSchema(null, true, 0),

  category: stringSchema(null, true),

  //SKU: stock keeping unit / reference number
  SKU: stringSchema({ unique: true }, true),

  state: { type: Boolean, require: true },

  amount: numberSchema(),

  model: stringSchema(),

  brand: stringSchema({ uppercase: true }),

  description: stringSchema(),

  url_img: stringSchema(),

  QR: stringSchema(),
});

module.exports = model("Product", ProductSchema);
