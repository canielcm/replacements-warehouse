const getItems = async (ModelInstance, ID, data) => {
  try {
    let itemResult;
    !ID && !data ? (itemResult = await ModelInstance.find({})) : null;
    ID ? (itemResult = await ModelInstance.findById(ID).exec()) : null;
    data ? (itemResult = await ModelInstance.find(data).exec()) : null;
    return itemResult;
  } catch (error) {}
};

const addToDB = async (ModelInstance, data) => {
  try {
    const item = new ModelInstance(data);
    await item.save();
    return item;
  } catch (error) {
    return {
      ok: false,
      msg: "item not added",
      error,
    };
  }
};

const uptateItem = async (ModelInstance, ID, data) => {
  try {
    const item = await ModelInstance.findByIdAndUpdate(ID, data);
    return item;
  } catch (error) {
    return {
      ok: false,
      msg: "item not updated",
      error,
    };
  }
};

const deleteItem = async (ModelInstance, ID) => {
  try {
    await ModelInstance.findByIdAndDelete(ID);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getItems,
  addToDB,
  uptateItem,
  deleteItem,
};
