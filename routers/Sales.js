const express = require('express');

const router = express.Router();

const Sales = require('../controllers/Sales');

router.route('/')
.get(Sales.getAll)
.post(Sales.create);

router.route('/:id')
  .get(Sales.findById)
  .put(Sales.update);

module.exports = router;