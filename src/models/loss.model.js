const { Schema, model } = require("mongoose");
const {stringSchema, numberSchema} = require('./SchemaTypeModels');

const LossSchema = new Schema({
  date: {
      type: Date,
      default: Date.now
  },
  reason: stringSchema(),
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
  totalLost: numberSchema()
});

module.exports = model('Loss', LossSchema);