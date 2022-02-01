const Response = require("./ResponsesModel");
const Customer = require("../models/customer.model");
const {
  getItems,
  addToDB,
  uptateItem,
  deleteItem,
} = require("../helpers/mongoDBFunctions");

//GET CUSTOMER
const customerGet = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await getItems(Customer, id);
    customer
      ? res.status(200).json(Response._200(customer))
      : res.status(404).json(Response._404("Customer not found"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//GET ALL CUSTOMERS OR LOOK FOR THEM BY ATTRIBUTES
const customersGet = async (req, res) => {
  try {
    const query = req.query;
    let customers;
    if (query) {
      customers = await getItems(Customer, null, query);
      customers
        ? res.status(200).json(Response._200(customers))
        : res.status(404).json(Response._404("NO customers found"));
    } else {
      customers = await getItems(Customer);
      customers
        ? res.status(200).json(Response._200(customers))
        : res.status(404).json(Response._404("Customers not found"));
    }
  } catch (error) {
    res.status(400).json(Response._500(error));
  }
};

//ADD CUSTOMER
const addCustomer = async (req, res) => {
  try {
    let body = req.body;
    let data = await addToDB(Customer, body);
    if(data.ok==false) return res.status(400).json(Response._400(data));
    return res.status(200).json(Response._200(data));
  } catch (error) {
    return res.status(400).json(Response._500(error));
  }
};

//UPDATE CUSTOMER
const customerPut = async (req, res) => {
  const { id } = req.params;
  let { _id, QR, SKU, ...rest } = req.body;
  const customer = await uptateItem(Customer, id, rest);
  res.status(200).json(
    Response._200(
      {
        id,
        customer,
      },
      "customer updated"
    )
  );
};

//DELETE CUSTOMER
const customerDelete = async (req, res) => {
  try {
    const id = req.params.id;
    let customerDeleted = await deleteItem(Customer, id);
    customerDeleted
      ? res.status(200).json(Response._200(customerDeleted, "customer was deleted"))
      : res.status(404).json(Response._404("customer not deleted"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//DISABLE CUSTOMER
const customerDisable = async (req, res) => {
  try {
    const id = req.params.id;
    let customer = await uptateItem(Customer, id, { status: false });
    res
      .status(200)
      .json(
        Response._200(
          { customerDeleted: customer },
          `Now customer ${customer._id} is disabled`
        )
      );
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

module.exports = {
  addCustomer,
  customerGet,
  customersGet,
  customerPut,
  customerDelete,
  customerDisable,
};