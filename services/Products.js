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

const validateId = async (id) => {
  const products = await ProductsModel.getAll();

  if (!products.some((product) => +product.id === +id)) {
    return { isValid: false };
  }

  return { isValid: true };
};

const update = async ({ id, name }) => {
  if ((await validateId(id)).isValid === false) return validateId(id);

  const response = await ProductsModel.update({ id, name });

  if (response.affectedRows === 1) return { id, name };
};

const remove = async (id) => {
  if ((await validateId(id)).isValid === false) return validateId(id);

  const response = await ProductsModel.remove(id);

  // return console.log(response);
  if (response.affectedRows) return { removed: true };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};