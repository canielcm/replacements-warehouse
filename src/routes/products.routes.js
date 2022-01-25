const { Router } = require("express");
const router = Router();
const {
  addProduct,
  productGet,
  productsGet,
  productPut,
  productDelete,
  productDisable,
} = require("../controllers/products.controller");

/* 
  addProduct,
  productGet,
  productsGet,
  productPut,
  productDelete,
  productDisable,
*/

router.get("/:id", productGet);
router.get("/", productsGet);
router.post("/", addProduct);
router.put('/:id',productPut);
router.delete('/:id',productDisable);
router.delete('/delete/:id',productDelete);

module.exports = router;
