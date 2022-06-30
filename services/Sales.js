const SalesModel = require('../models/Sales');

const validateProductId = (data) => {
  const sales = !Array.isArray(data) ? [data] : data;

  if (!sales.every((sale) => sale.productId !== undefined)) {
    return { isValid: false, err: { code: 400, message: '"productId" is required' } };
  }

  // pensar em como validar se o productId existe na tabela product

  return { isValid: true };
};

const validateSale = (data) => {
  const sales = !Array.isArray(data) ? [data] : data;

  if (!sales.every((sale) => sale.quantity)) {
    return { isValid: false, err: { code: 400, message: '"quantity" is required' } };
  }

  if (!sales.every((sale) => sale.quantity >= 1)) {
    return {
      isValid: false,
      err: { code: 400, message: '"quantity" must be greater than or equal to 1',
      },
    };
  }

  return { isValid: true };
};

const validate = (sales) => {
  if (!validateProductId(sales).isValid) return validateProductId(sales);
  
  if (!validateSale(sales).isValid) return validateSale(sales);

  return { isValid: true };
};

const create = async (sales) => {
  if (!validate(sales).isValid) return validate(sales);

  const { id } = await SalesModel.create(sales);
  return { id };
};

module.exports = {
  create,
};