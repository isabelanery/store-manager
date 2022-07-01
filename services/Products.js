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

const isNameValid = (name) => {
  if (!name || typeof name !== 'string') return { isNameValid: false, err: 400 };
  if (name.length < 5) return { isNameValid: false, err: 422 };

  return { isNameValid: true };
};

const create = async ({ name }) => {
  const validation = isNameValid(name);

  if (!validation.isNameValid) return validation;

  const { id } = await ProductsModel.create({ name });
  
  return { id, name };
};

const update = async ({ id, name }) => {
  const response = await ProductsModel.update({ id, name });

  if (response.affectedRows === 1) return { id, name };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};