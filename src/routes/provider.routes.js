const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  addProvider,
  providerGet,
  providersGet,
  providerPut,
  providerDelete,
  providerDisable,
} = require("../controllers/provider.controller");

router.get("/", providersGet);
router.get("/:id", providerGet);
router.post("/", addProvider);
router.put("/:id", providerPut);
router.delete("/:id", providerDisable);
router.delete("/delete/:id", providerDelete);

module.exports = router;
