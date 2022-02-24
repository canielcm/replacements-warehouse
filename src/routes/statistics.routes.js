const { Router } = require("express");
const router = Router();
const {
  getTopSellers,
  getCostsAndRevenuesPerMonth,
  GetOrdersByDate,
} = require("../controllers/statistics.controller");
const { validateJWT, validateRole } = require("../middlewares");

router.get(
  "/month/:year/:month",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  GetOrdersByDate
);
router.get(
  "/balance/:range",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  getCostsAndRevenuesPerMonth
);
router.get(
  "/topsellers",
  [validateJWT, validateRole("SUPER_ADMIN", "ADMIN_ROLE", "USER_ROLE")],
  getTopSellers
);

module.exports = router;
