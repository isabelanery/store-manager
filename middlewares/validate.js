const ProductsService = require('../services/Products');

const productName = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: '"name" is required' });
  }
  // { isNameValid: false, err: 400 };
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const productId = async (req, res, next) => {
  const { id } = req.params;
  
  const products = await ProductsService.getAll();

  if (!products.some((product) => +product.id === +id)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  productName,
  productId,
};
