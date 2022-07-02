const express = require('express');
const validate = require('../middlewares/validate');

const router = express.Router();

const Products = require('../controllers/Products');

router.route('/')
  .get(Products.getAll)
  .post(validate.productName, Products.create);
  
router.route('/:id')
  .get(Products.findById)
  .put(validate.productId, validate.productName, Products.update)
  .delete(Products.remove);

module.exports = router;
