const { Schema, model } = require("mongoose");
const {stringSchema, numberSchema} = require('./SchemaTypeModels');
const UserSchema = Schema({
  name: stringSchema(null, true),

  email: stringSchema({unique: true}, true),

  password: stringSchema(null, true),

  img: stringSchema(),

  role: stringSchema(null, true),

  state: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
  
});

UserSchema.methods.toJSON = function(){
  const {__v, password,_id, ...user}= this.toObject();
  return {...user,uid:_id };
}
module.exports = model('User', UserSchema);