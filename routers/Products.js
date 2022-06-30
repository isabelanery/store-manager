const express = require('express');

const router = express.Router();

const Products = require('../controllers/Products');

router.route('/')
  .get(Products.getAll)
  .post(Products.create);

router.get('/:id', Products.findById);

module.exports = router;