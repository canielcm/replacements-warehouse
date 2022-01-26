const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const Response = require("./ResponsesModel");
const {
  getItems,
  addToDB,
  uptateItem,
  deleteItem,
} = require("../helpers/mongoDBFunctions");

//GET USER
const userGet = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getItems(User, id);
    user
      ? res.status(200).json(Response._200(user))
      : res.status(404).json(Response._404("User not found"));
  } catch (error) {
    res.status(400).json(Response._500(error));
  }
};

//GET ALL USERS OR LOOK FOR BY ATTRIBUTES
const usersGet = async (req, res) => {
  try {
    const query = req.query;
    let users;
    if (query) {
      users = await getItems(User, null, query);
      users
        ? res.status(200).json(Response._200(users))
        : res.status(404).json(Response._404("NO Users found"));
    } else {
      users = await getItems(User);
      users
        ? res.status(200).json(Response._200(users))
        : res.status(404).json(Response._404("Users not found"));
    }
  } catch (error) {
    res.status(400).json(Response._500(error));
  }
};

//ADD USER
const userPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);
  let user = await addToDB(User, {
    name,
    email,
    password,
    role,
    password: hashedPassword,
  });
  res.status(201).json(Response._200(user, "user added"));
};

//UPDATE USER
const userPut = async (req, res) => {
  const { id } = req.params;
  let { _id, password, email, ...rest } = req.body;
  if (password) {
    password = await bcrypt.hash(password, 10);
  }
  const user = await uptateItem(User, id, rest);
  res.status(200).json(
    Response._200(
      {
        id,
        user,
      },
      "User updated"
    )
  );
};

//DELETE USER
const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    let userDeleted = await deleteItem(User, id);
    userDeleted
      ? res.status(200).json(Response._200(userDeleted, "user was deleted"))
      : res.status(404).json(Response._404("User not deleted"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//DISABLE USER
const userDisable = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await uptateItem(User, id, { status: false });
    const uid = req.uid;
    const authUser = req.user;
    res
      .status(200)
      .json(
        Response._200(
          { userDeleted: user, authUser, uid },
          `Now user ${user._id} is disabled`
        )
      );
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

module.exports = {
  userGet,
  usersGet,
  userPut,
  userPost,
  userDelete,
  userDisable,
};
