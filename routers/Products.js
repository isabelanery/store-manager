const express = require('express');

const router = express.Router();

const Products = require('../controllers/Products');

router.route('/')
  .get(Products.getAll)
  .post(Products.create);
  
router.route('/:id')
  .get(Products.findById)
  .put(Products.update)
  .delete(Products.remove);

module.exports = router;
