const { Router } = require("express");
const router = Router();
const {
    getTopSellers,
    getBottomSellers,
    getCostsAndRevenuesPerMonth,
  
    monthDiff,
    getTransactions,
    getDataByDate,
    GetOrdersByDate
} = require("../controllers/statistics.controller");

router.get("/month/:year/:month", GetOrdersByDate);
router.get("/balance/:range", getCostsAndRevenuesPerMonth);

module.exports = router;
