const { Schema, model } = require("mongoose");
const {stringSchema, numberSchema} = require('./SchemaTypeModels');

const PurchaseSchema = new Schema({
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
          total: numberSchema(),
      }
  },
  provider:{
      type: {
          name: stringSchema(null, true),
          NIT: stringSchema(),
          RUT: stringSchema(),
      }
  },
  totalToPay: numberSchema(),
  paymentOption: stringSchema(null, true),
  paymentMethod: stringSchema(null, true) 
});

module.exports = model('Purchase', PurchaseSchema);
