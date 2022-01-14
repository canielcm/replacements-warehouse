const { Router } = require("express");
const router = Router();
const {addProduct} = require('../controllers/products.controller');

router.post("/", addProduct);

module.exports = router;
