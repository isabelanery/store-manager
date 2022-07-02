const SalesModel = require('../models/Sales');
// const ProductsModel = require('../models/Products');

// const validateProductId = async (data) => {
//   const sales = !Array.isArray(data) ? [data] : data;

//   if (!sales.every((sale) => sale.productId)) {
//     return { isValid: false, err: { code: 400, message: '"productId" is required' } };
//   }

//   const products = await ProductsModel.getAll();
//   if (!sales.every((sale) => products.some((product) => +product.id === +sale.productId))) {
//     return { isValid: false, err: { code: 404, message: 'Product not found' } };
//   }

//   return { isValid: true };
// };

// const validateQuantity = (data) => {
//   const sales = !Array.isArray(data) ? [data] : data;

//   if (!sales.every((sale) => sale.quantity !== undefined)) {
//     return { isValid: false, err: { code: 400, message: '"quantity" is required' } };
//   }

//   if (!sales.every((sale) => sale.quantity >= 1)) {
//     return {
//       isValid: false,
//       err: { code: 422, message: '"quantity" must be greater than or equal to 1' },
//     };
//   }

//   return { isValid: true };
// };

// const isDataValid = async (sales) => {
//   if (!validateQuantity(sales).isValid) return validateQuantity(sales);
  
//   if (await !validateProductId(sales).isValid) return validateProductId(sales);

//   return { isValid: true };
// };

const create = async (sales) => {
  // const validation = await isDataValid(sales);

  // if (validation.isValid === false) return validation;

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

const update = async ({ saleId, saleUpdate }) => {
  // const sales = await SalesModel.getAll();
  // const validateSale = sales.some((item) => +item.saleId === +saleId);
  // if (!validateSale) return { isValid: false, err: { code: 404, message: 'Sale not found' } };

  // const validation = await isDataValid(saleUpdate);
  // if (validation.isValid === false) return validation;

  const response = await SalesModel.update({ saleId, saleUpdate });

  return response;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};