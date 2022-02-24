const { Router } = require("express");
const router = Router();
const { validateJWT, validateRole } = require("../middlewares/");

const {
  addProduct,
  productGet,
  productsGet,
  productPut,
  productDelete,
  productDisable,
} = require("../controllers/products.controller");

[validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.get("/:id", productGet);
[validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.get("/", productsGet);
[validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.post("/", addProduct);
router.put(
  "/:id",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  productPut
);
[validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.delete("/:id", productDisable);
[validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.delete("/delete/:id", productDelete);

module.exports = router;
