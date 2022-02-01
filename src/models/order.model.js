const { Schema, model } = require("mongoose");
const {stringSchema, numberSchema} = require('./SchemaTypeModels');

const OrderSchema = new Schema({
  date: {
      type: Date,
      default: Date.now
  },
  products: {
      type: Array,
      Schema:{
          id: stringSchema(),
          SKU: stringSchema(),
          name: stringSchema(null, true),
          amount: numberSchema(null, true),
          codes: {
              type: Array,
              Schema: [String]
          },
          total: numberSchema(),
      }
  },
  customer:{
      type: {
          name: stringSchema(null, true),
          CC: stringSchema(),
          NIT: stringSchema(),
          RUT: stringSchema(),
      }
  },
  discount: numberSchema(),
  totalPrice: numberSchema(),
  totalToPay: numberSchema()
});

module.exports = model('Order', OrderSchema);
