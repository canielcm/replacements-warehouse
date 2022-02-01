const Response = require("./ResponsesModel");
const Provider = require("../models/provider.model");
const {
  getItems,
  addToDB,
  uptateItem,
  deleteItem,
} = require("../helpers/mongoDBFunctions");

//GET PROVIDER
const providerGet = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await getItems(Provider, id);
    provider
      ? res.status(200).json(Response._200(provider))
      : res.status(404).json(Response._404("Provider not found"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//GET ALL PROVIDERS OR LOOK FOR THEM BY ATTRIBUTES
const providersGet = async (req, res) => {
  try {
    const query = req.query;
    let providers;
    if (query) {
      providers = await getItems(Provider, null, query);
      providers
        ? res.status(200).json(Response._200(providers))
        : res.status(404).json(Response._404("NO providers found"));
    } else {
      providers = await getItems(Provider);
      providers
        ? res.status(200).json(Response._200(providers))
        : res.status(404).json(Response._404("Providers not found"));
    }
  } catch (error) {
    res.status(400).json(Response._500(error));
  }
};

//ADD PROVIDER
const addProvider = async (req, res) => {
  try {
    let body = req.body;
    let data = await addToDB(Provider, body);
    if(data.ok==false) return res.status(400).json(Response._400(data));
    return res.status(200).json(Response._200(data));
  } catch (error) {
    return res.status(400).json(Response._500(error));
  }
};

//UPDATE PROVIDER
const providerPut = async (req, res) => {
  const { id } = req.params;
  let { _id, QR, SKU, ...rest } = req.body;
  const provider = await uptateItem(Provider, id, rest);
  const newProviderData = rest;
  const newProvider = {
    ...provider._doc,
    ...newProviderData
  }
  res.status(200).json(
    Response._200(
      {
        id,
        newProvider
      },
      "provider updated"
    )
  );
};

//DELETE PROVIDER
const providerDelete = async (req, res) => {
  try {
    const id = req.params.id;
    let providerDeleted = await deleteItem(Provider, id);
    providerDeleted
      ? res.status(200).json(Response._200(providerDeleted, "provider was deleted"))
      : res.status(404).json(Response._404("provider not deleted"));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

//DISABLE PROVIDER
const providerDisable = async (req, res) => {
  try {
    const id = req.params.id;
    let provider = await uptateItem(Provider, id, { status: false });
    res
      .status(200)
      .json(
        Response._200(
          { providerDeleted: provider },
          `Now provider ${provider._id} is disabled`
        )
      );
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

module.exports = {
  addProvider,
  providerGet,
  providersGet,
  providerPut,
  providerDelete,
  providerDisable,
};