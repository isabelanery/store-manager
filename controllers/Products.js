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
  
  // if (product.err === 400) return res.status(400).json({ message: '"name" is required' });
  
  // if (product.err === 422) {
  //   return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  // }

  res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const response = await ProductsService.update({ id, name });

  // if (response.err === 404) return res.status(404).json({ message: 'Product not found' });

  // if (response.err === 400) return res.status(400).json({ message: '"name" is required' });

  // if (response.err === 422) {
  //   return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  // }

  res.status(200).json(response);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const response = await ProductsService.remove(id);

  if (response.isValid === false) return res.status(404).json({ message: 'Product not found' });

  res.status(204);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
