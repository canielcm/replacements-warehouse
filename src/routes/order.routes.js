const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  makeOrder,
  orderGet,
  ordersGet,
//   orderPut,
//   orderDelete,
//   orderDisable,
} = require("../controllers/order.controller");

router.get("/:id", orderGet);
router.get("/", ordersGet);
router.post("/", makeOrder);
// router.put("/:id", orderPut);
// router.delete("/:id", orderDisable);
// router.delete("/delete/:id", orderDelete);

module.exports = router;
