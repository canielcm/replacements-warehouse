const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  makePurchase,
  purchaseGet,
  purchasesGet,
//   purchasePut,
//   purchaseDelete,
//   purchaseDisable,
} = require("../controllers/purchase.controller");

router.get("/:id", purchaseGet);
router.get("/", purchasesGet);
router.post("/", makePurchase);
// router.put("/:id", purchasePut);
// router.delete("/:id", purchaseDisable);
// router.delete("/delete/:id", purchaseDelete);

module.exports = router;
