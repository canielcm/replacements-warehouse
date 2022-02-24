const Response = require("./ResponsesModel");
const Order = require("../models/order.model");
const Purchase = require("../models/purchase.model");
const Loss = require("../models/loss.model");

const getDataByDate = async (year, month, model) => {
  try {
    month = Number(month);
    const fromDate = new Date(year, month, 1);
    const toDate = new Date(year, month + 1, 0);
    let dataOfMonth = await model.find({
      date: {
        $gte: fromDate,
        $lt: toDate,
      },
    });
    return dataOfMonth;
  } catch (error) {}
};

const sortMap = (obj) => {
  var sortable = [];
  for (var e in obj) {
    sortable.push([e, obj[e]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  return sortable.slice(0, 3);
};

const GetOrdersByDate = async (req, res) => {
  try {
    const { year, month } = req.params;
    const data = await getDataByDate(year, month, Order);
    res.status(200).json(Response._200(data));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

const getTopSellers = async (req, res) => {
  try {
    const currentDate = Date.now();
    const today = new Date(currentDate);
    const fromDate = today;
    const toDate = new Date(currentDate);
    fromDate.setMonth(today.getMonth() - 1);
    let dataOfMonth = await Order.find({
      date: {
        $gte: fromDate,
        $lt: toDate,
      },
    });
    let productsSelled = {};
    dataOfMonth.forEach((element) => {
      element.products.forEach((e) => {
        if (productsSelled[e.name]) {
          productsSelled[e.name] = productsSelled[e.name] + e.amount;
        } else {
          productsSelled = {
            ...productsSelled,
            [e.name]: e.amount,
          };
        }
      });
    });

    let bestSellers = sortMap(productsSelled);

    res.status(200).json(Response._200(bestSellers));
  } catch (error) {
    res.status(500).json(Response._500(error.message));
  }
};

const getCostsAndRevenuesPerMonth = async (req, res) => {
  try {
    let { range } = req.params;
    range = Number(range);
    const currentDate = Date.now();
    const today = new Date(currentDate);
    const summary = [];
    let tempDate = today;
    tempDate.setMonth(today.getMonth() - Number(range) + 1);
    tempDate.setDate(1);

    for (let i = 1; i <= range; i++) {
      //    calc outgoings
      const purchases = await getDataByDate(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        Purchase
      );
      const losses = await getDataByDate(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        Loss
      );
      let purchasesTotalCosts = purchases.reduce((acc, element) => {
        return acc + element.totalToPay;
      }, 0);
      let lossesTotalExpenses = losses.reduce((acc, element) => {
        return acc + element.totalLost;
      }, 0);

      const monthlyoutgoings = purchasesTotalCosts + lossesTotalExpenses;

      //   calc income
      const orderTotalIncome = await getDataByDate(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        Order
      );
      const monthlyIncome = orderTotalIncome.reduce(
        (acc, element) => acc + element.totalToPay,
        0
      );

      summary.push({
        year: tempDate.getFullYear(),
        month: tempDate.getMonth(),
        outgoins: monthlyoutgoings,
        income: monthlyIncome,
      });

      tempDate.setMonth(tempDate.getMonth() + 1);
    }

    res.status(200).json(Response._200(summary));
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

module.exports = {
  getTopSellers,
  getCostsAndRevenuesPerMonth,
  getDataByDate,
  GetOrdersByDate,
};
