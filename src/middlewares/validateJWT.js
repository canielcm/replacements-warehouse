const jwt = require("jsonwebtoken");
const Response = require("../controllers/ResponsesModel");
const User = require('../models/user.model');
const { getItems } = require("../helpers/mongoDBFunctions");
const validateJWT = async (req, res, next) => {
  console.log('validateJWT executed');
  const token = req.header("access-token");
  if (!token) {
    return res.status(401).json(Response._400("Token is required"));
  }
  try {
    const {uid}=jwt.verify(token, process.env.SECRETKEY);
    req.uid = uid; 
    const authUser = await getItems(User,uid);
    //verify user
    if(!authUser) return res.status(401).json(Response._400('User doesn\'t excist in Database'));
    //verify user status
    if(!authUser.status)return res.status(401).json(Response._400('User is unauthorized'));
    req.user = authUser;
    next();
  } catch (error) {
    res.status(401).json(Response._400('Token isn\'t valid'));
  }
};
module.exports = {validateJWT};
