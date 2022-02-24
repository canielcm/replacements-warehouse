const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  makePurchase,
  purchaseGet,
  purchasesGet,
} = require("../controllers/purchase.controller");
const { validateJWT, validateRole } = require("../middlewares");

router.get(
  "/:id",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  purchaseGet
);
router.get(
  "/",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  purchasesGet
);
router.post(
  "/",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  makePurchase
);

module.exports = router;
