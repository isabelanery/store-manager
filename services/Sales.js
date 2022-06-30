const SalesModel = require('../models/Sales');
const ProductsModel = require('../models/Products');

const validateProductId = async (data) => {
  const sales = !Array.isArray(data) ? [data] : data;

  if (!sales.every((sale) => sale.productId)) {
    return { isValid: false, err: { code: 400, message: '"productId" is required' } };
  }

  const products = await ProductsModel.getAll();
  if (!sales.every((sale) => products.some((product) => +product.id === +sale.productId))) {
    return { isValid: false, err: { code: 404, message: 'Product not found' } };
  }
  // pensar em como validar se o productId existe na tabela product

  return { isValid: true };
};

const validateSale = (data) => {
  const sales = !Array.isArray(data) ? [data] : data;

  console.log(sales.every((sale) => sale.quantity));
  if (!sales.every((sale) => sale.quantity)) {
    return { isValid: false, err: { code: 400, message: '"quantity" is required' } };
  }
  
  if (!sales[0].quantity) {
    return { isValid: false, err: { code: 400, message: '"quantity" is required' } };
  }
  // if (sales.some((sale) => !sale.quantity)) {
  // }

  if (!sales.every((sale) => sale.quantity >= 1)) {
    return {
      isValid: false,
      err: { code: 400, message: '"quantity" must be greater than or equal to 1',
      },
    };
  }

  return { isValid: true };
};

const isDataValid = async (sales) => {
  if (await !validateProductId(sales).isValid) return validateProductId(sales);
  
  if (!validateSale(sales).isValid) return validateSale(sales);

  return { isValid: true };
};

const create = async (sales) => {
  const validation = await isDataValid(sales);

  if (validation.isValid === false) return validation;
  // console.log(validation);

  const { id } = await SalesModel.create(sales);
  return { id };
};

module.exports = {
  create,
};