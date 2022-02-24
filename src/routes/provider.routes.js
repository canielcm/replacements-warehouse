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
const { validateJWT, validateRole } = require("../middlewares/");

router.get(
  "/",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  providersGet
);
router.get(
  "/:id",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  providerGet
);
router.post(
  "/",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  addProvider
);
router.put("/:id", providerPut);
router.delete(
  "/:id",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  providerDisable
);
router.delete(
  "/delete/:id",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE")],
  providerDelete
);

module.exports = router;
