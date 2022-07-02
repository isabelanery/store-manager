const express = require('express');
const rescue = require('express-rescue');

const validate = require('../middlewares/validation');

const router = express.Router();

const Sales = require('../controllers/Sales');

router.route('/')
  .get(rescue(Sales.getAll))
  .post(
    rescue(validate.saleProductsId),
    validate.saleProductsQuantity,
    rescue(Sales.create),
  );

router.route('/:id')
  .get(rescue(Sales.findById))
  .put(
    rescue(validate.saleProductsId),
    validate.saleProductsQuantity,
    rescue(Sales.update),
  )
  .delete(
    rescue(validate.saleId),
    rescue(Sales.remove),
  );

module.exports = router;