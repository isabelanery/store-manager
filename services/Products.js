const Products = require('../models/Products');

const getAll = async () => {
  const products = await Products.getAll();

  return products;
};

const findById = async (id) => {
  const product = await Products.findById(id);

  if (!product) return null;

  return product[0];
};

module.exports = {
  getAll,
  findById,
};