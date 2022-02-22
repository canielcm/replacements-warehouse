const Response = require("./ResponsesModel");
const Order = require("../models/order.model");
const Purchase = require("../models/purchase.model");
const Loss = require("../models/loss.model");

const getDataByDate = async (year, month, model) => {
  try {
    month = Number(month);
    console.log(month + 1);
    const fromDate = new Date(year, month, 1);
    const toDate = new Date(year, month + 1, 0);
    console.log("fromDate", fromDate.toDateString());
    console.log("toDate", toDate.toDateString());
    let dataOfMonth = await model.find({
      date: {
        $gte: fromDate,
        $lt: toDate,
      },
    });
    return dataOfMonth;
  } catch (error) {
    console.log(error);
  }
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

const monthDiff = (d1, d2) => {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

const getTransactions = async (initialDate, finalDate, transactions) => {
  try {
    const monthDifference = monthDiff(initialDate, finalDate);
    let month = initialDate;
  } catch (error) {
    return error;
  }
};

const getTopSellers = async (req, res) => {
  try {
    const currentDate = Date.now();
    const today = new Date(currentDate);
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(today.getMonth - 1);
  } catch (error) {
    res.status(500).json(Response._500(error));
  }
};

const getBottomSellers = async (req, res) => {};

const getCostsAndRevenuesPerMonth = async (req, res) => {
  try {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    let { range } = req.params;
    range = Number(range);
    const currentDate = Date.now();
    console.log("currentDate ", currentDate);
    const today = new Date(currentDate);
    const summary = [];
    let tempDate = today;
    console.log("***************");
    console.log("Today", today);
    tempDate.setMonth(today.getMonth() - Number(range) + 1);
    tempDate.setDate(1);
    console.log(tempDate);

    for (let i = 1; i <= range; i++) {
      console.log("*******************\ncicle ", i);
      console.log("(inside for) tempDate:", tempDate.toDateString());

      //    calc outgoings
      const purchases = await getDataByDate(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        Purchase
      );
      console.log("purchase ", purchases);
      const losses = await getDataByDate(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        Loss
      );
      console.log("looses ", losses);
      let purchasesTotalCosts = purchases.reduce((acc, element) => {
        console.log("purchasesTotalCosts: ", acc + element.totalToPay);
        return acc + element.totalToPay;
      }, 0);
      let lossesTotalExpenses = losses.reduce((acc, element) => {
        console.log("lossesTotalExpenses ", acc + element.totalLost);
        return acc + element.totalLost;
      }, 0);

      const monthlyoutgoings = purchasesTotalCosts + lossesTotalExpenses;

      //   calc income
      const orderTotalIncome = await getDataByDate(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        Order
      );
      console.log("order ", orderTotalIncome);
      const monthlyIncome = orderTotalIncome.reduce((acc, element) => {
        console.log("monthlyIncome ", acc + element.totalToPay);
        return acc + element.totalToPay;
      }, 0);

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
  getBottomSellers,
  getCostsAndRevenuesPerMonth,

  monthDiff,
  getTransactions,
  getDataByDate,
  GetOrdersByDate,
};
