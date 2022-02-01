const { Schema, model } = require("mongoose");
const {stringSchema, numberSchema} = require('./SchemaTypeModels');
const CustomerSchema = Schema({
  name: stringSchema(null, true),
  type: stringSchema({enum: ["COMPANY","NATURAL"]}, true),
  CC: stringSchema(),
  RUT: stringSchema(),
  NIT: stringSchema(),
  email: stringSchema({unique: false}),
  address: stringSchema({ uppercase: true }),
  phone: stringSchema(),
  status: {type: Boolean, default: true}
});

module.exports = model('Customer', CustomerSchema);
