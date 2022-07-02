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

const create = async ({ name }) => {
  const { id } = await ProductsModel.create({ name });
  
  return { id, name };
};

const update = async ({ id, name }) => {
  const response = await ProductsModel.update({ id, name });

  if (response.affectedRows === 1) return { id, name };
};

const remove = async (id) => {
  const response = await ProductsModel.remove(id);

  if (response.affectedRows) return { removed: true };
};

const search = async (name) => {
  const response = await ProductsModel.search(name);

  return response;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  search,
};