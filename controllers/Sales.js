const SalesService = require('../services/Sales');

const create = async (req, res) => {
  const newSale = req.body;

  const response = await SalesService.create(newSale);

  if (response.isValid === false) {
    return res.status(response.err.code).json({ message: response.err.message });
  }

  const result = {
    id: response.id,
    itemsSold: newSale,
  };

  res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();

  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.findById(id);

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(sale);

  return sale;
};

const update = async (req, res) => {
  const { id } = req.params;
  const itemsUpdated = req.body;

  const response = await SalesService.update({ saleId: id, itemsUpdated });

  if (response.err) {
    return res.status(response.err.code).json({ message: response.err.message });
  }

  res.status(200).json({ saleId: id, itemsUpdated });
};

const remove = async (req, res) => {
  const { id } = req.params;

  const response = await SalesService.remove(id);
  
  if (response.affectedRows) return res.status(204);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
