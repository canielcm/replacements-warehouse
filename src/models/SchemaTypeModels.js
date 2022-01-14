const stringSchema = (schemaAttributes={}, require=false) => {
  let mySchema = {
    require,
    trim: true,
    type: String,
  };

  return { ...mySchema, ...schemaAttributes };
};

const numberSchema = (schemaAttributes={}, require=false, min, max)=>{
  let mySchema = {
    type: Number,
    default: 0,
    require, 
    min, 
    max
  };

  return { ...mySchema, ...schemaAttributes };
}


module.exports = {
    stringSchema,
    numberSchema
}