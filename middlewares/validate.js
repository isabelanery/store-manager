const ProductsService = require('../services/Products');

const productName = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: '"name" is required' });
  }

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

const saleProductsId = async (req, res, next) => {
  const data = req.body;
  const sales = !Array.isArray(data) ? [data] : data;

  if (!sales.every((sale) => sale.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const products = await ProductsService.getAll();
  if (!sales.every((sale) => products.some((product) => +product.id === +sale.productId))) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const saleProductsQuantity = (req, res, next) => {
  const data = req.body;

  const sales = !Array.isArray(data) ? [data] : data;

  if (!sales.every((sale) => sale.quantity !== undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  
  if (!sales.every((sale) => sale.quantity >= 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  productName,
  productId,
  saleProductsId,
  saleProductsQuantity,
};
