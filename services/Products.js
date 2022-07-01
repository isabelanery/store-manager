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
  if (!name || typeof name !== 'string') return { isNameValid: false, err: 400 };
  if (name.length < 5) return { isNameValid: false, err: 422 };

  return { isNameValid: true };
};

const create = async ({ name }) => {
  const validation = isValid(name);

  if (!validation.isNameValid) return validation;

  const { id } = await ProductsModel.create({ name });
  
  return { id, name };
};

const update = async ({ _id, _name }) => {
  
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};