const express = require('express');

const router = express.Router();

const Sales = require('../controllers/Sales');

router.route('/')
  .post(Sales.create);

module.exports = router;