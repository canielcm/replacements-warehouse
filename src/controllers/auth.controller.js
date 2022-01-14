const bcryptjs = require("bcryptjs");
const Response = require("./ResponsesModel");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { getItems } = require("../helpers/mongoDBFunctions");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await getItems(User, null, { email });
    user = user[0];

    if (!user || (user && !user.state)) {
      return res.status(400).json(Response._400("Email is wrong"));
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json(Response._400("Password is Wrong"));
    }
    const token = await generateJWT(user._id);
    return res.status(200).json(Response._200({ token, user }));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

const getCurrentUser = async (req, res) => {
  const token = req.header("access-token");
  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    const authUser = await getItems(User, uid);
    res.status(200).json(Response._200(authUser));
  } catch (error) {
    console.log(error);

    res.status(500).json(Response._500(error));
  }
};
module.exports = {
  login,
  getCurrentUser,
};
