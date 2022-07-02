const express = require('express');
const validate = require('../middlewares/validation');

const router = express.Router();

const Sales = require('../controllers/Sales');

router.route('/')
  .get(Sales.getAll)
  .post(
    validate.saleProductsId,
    validate.saleProductsQuantity,
    Sales.create,
  );

router.route('/:id')
  .get(Sales.findById)
  .put(
    validate.saleProductsId,
    validate.saleProductsQuantity,
    Sales.update,
  )
  .delete(validate.saleId, Sales.remove);

module.exports = router;