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

module.exports = {
  create,
};
