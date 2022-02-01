const Role = require("../models/role.model");
const User = require("../models/user.model");
const Customer = require("../models/customer.model");

const isAValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error("Role has to be in the DB");
  }
};

const emailExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`Email ${email} already exists`);
  }
};
const customerEmailExists = async (email = "") => {
  const emailExists = await Customer.findOne({ email });
  if (emailExists) {
    throw new Error(`Email ${email} already exists`);
  }
};

const userExistsById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`User with id ${id} doesn't exists`);
  }
};

module.exports = {
  isAValidRole,
  emailExists,
  userExistsById,
  customerEmailExists
};
