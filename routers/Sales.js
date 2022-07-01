const express = require('express');

const router = express.Router();

const Sales = require('../controllers/Sales');

router.route('/:id')
  .get(Sales.findById);

router.route('/')
  .get(Sales.getAll)
  .post(Sales.create);

module.exports = router;