const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateRole } = require("../middlewares/");

const router = Router();
const {
  makeOrder,
  orderGet,
  ordersGet,
} = require("../controllers/order.controller");

[validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.get("/:id", orderGet);
[validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.get("/", ordersGet);
[validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  router.post("/", makeOrder);

module.exports = router;
