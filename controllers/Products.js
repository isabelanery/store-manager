const ProductsService = require('../services/Products');

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();

  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.findById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

const create = async (req, res) => {
  const { name } = req.body;

  const product = await ProductsService.create({ name });
  
  res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const response = await ProductsService.update({ id, name });

  res.status(200).json(response);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const response = await ProductsService.remove(id);

  if (response.removed) return res.status(204).end();
};

const search = async (req, res) => {
  const { q: name } = req.query;

  const response = await ProductsService.search(name);

  res.status(200).json(response);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  search,
};
