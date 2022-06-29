const ProductsModel = require('../models/Products');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const findById = async (id) => {
  const product = await ProductsModel.findById(id);

  if (!product) return null;

  return product[0];
};

const isValid = (name) => {
  if (!name || typeof name !== 'string') return false;
  if (name.length < 5) return false;

  return true;
};

const create = async ({ name }) => {
  const isNameValid = isValid(name);

  if (!isNameValid) return false;

  const { id } = await ProductsModel.create({ name });
  
  return { id };
};

module.exports = {
  getAll,
  findById,
  create,
};