const express = require('express');
const router = express.Router();

const CONSTANTS = require('./constants');
const getUniqueVisitors = require('./services/analytics');
const verifyToken = require('./middleware');

router.get("/", verifyToken, (req, res) => {
  res.send("Hello World!");
});

router.get("/unique-visitors", verifyToken, async (req, res) => {
  const response = {
    website: CONSTANTS.PORTFOLIO_WEBSITE,
    time: new Date(),
    uniqueVisitors: 0,
  };
  try {
    const uniqueVisitors = (await getUniqueVisitors()) || 0;
    response.uniqueVisitors = uniqueVisitors;
  } catch (err) {
    console.log("Error Occured", err);
  }

  res.send(response);
});

module.exports = router
