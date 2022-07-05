const SalesModel = require('../models/Sales');

const create = async (sales) => {
  const { id } = await SalesModel.create(sales);
  return { id };
};

const getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sales = await SalesModel.getAll();
  const validateId = sales.some((item) => +item.saleId === +id);
  if (!validateId) return false;

  const sale = await SalesModel.findById(id);
  return sale;
};

const update = async ({ saleId, itemsUpdated }) => {
  const promises = itemsUpdated.map((sale) => SalesModel.update({ saleId, itemsUpdated: sale }));
  // const response = await SalesModel.update({ saleId, saleUpdate });
  const response = await Promise.all(promises);
  return { affectedRows: response.length };
};

const remove = async (id) => {
  const response = await SalesModel.remove(id);

  return response;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};