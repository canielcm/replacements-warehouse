const { Schema, model } = require("mongoose");
const {stringSchema, numberSchema} = require('./SchemaTypeModels');
const ProviderSchema = Schema({
  name: stringSchema(null, true),
  RUT: stringSchema(),
  NIT: stringSchema(),
  email: stringSchema({unique: true}),
  address: stringSchema({ uppercase: true }),
  phone: stringSchema(),
  status: {type: Boolean, default: true}
});

module.exports = model('Provider', ProviderSchema);