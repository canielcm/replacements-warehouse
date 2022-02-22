const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  makeOrder,
  orderGet,
  ordersGet,
} = require("../controllers/order.controller");

router.get("/:id", orderGet);
router.get("/", ordersGet);
router.post("/", makeOrder);

module.exports = router;
