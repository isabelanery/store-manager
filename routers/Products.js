const express = require('express');

const router = express.Router();

const Products = require('../controllers/Products');

router.get('/', Products.getAll);

router.get('/:id', Products.findById);

module.exports = router;