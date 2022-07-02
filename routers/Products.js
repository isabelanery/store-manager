const express = require('express');
const rescue = require('express-rescue');
const validate = require('../middlewares/validation');

const router = express.Router();

const Products = require('../controllers/Products');

router.route('/')
  .get(rescue(Products.getAll))
  .post(
    validate.productName,
    rescue(Products.create),
  );
  
router.route('/search')
  .get(rescue(Products.search));

router.route('/:id')
  .get(rescue(Products.findById))
  .put(
    rescue(validate.productId),
    validate.productName,
    rescue(Products.update),
  )
  .delete(
    rescue(validate.productId),
    rescue(Products.remove),
  );

module.exports = router;
