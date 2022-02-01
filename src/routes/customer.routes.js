const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  addCustomer,
  customerGet,
  customersGet,
  customerPut,
  customerDelete,
  customerDisable,
} = require("../controllers/customer.controller");

router.get("/:id", customerGet);
router.get("/", customersGet);
router.post("/", addCustomer);
router.put("/:id", customerPut);
router.delete("/:id", customerDisable);
router.delete("/delete/:id", customerDelete);

module.exports = router;
