const { Schema, model } = require("mongoose");
const {stringSchema} = require('./SchemaTypeModels');

const RoleSchema = Schema({
  role: stringSchema(null, true),
});

module.exports = model("Role", RoleSchema);
