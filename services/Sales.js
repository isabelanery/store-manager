// const SalesModel = require('../models/Sales');

// const validateProductId = (sales) => {
//   if (!sales.every((sale) => sale.productId)) {
//     return { isValid: false, errCode: 400, errMsg: '"productId" is required' };
//   }

// };

// const validateSale = (data) => {
  
// const sales = typeof data === 'object' ? [data] : data;

//   if (!sales.every((sale) => sale.quantity)) {
//     return { isValid: false, errCode: 400, errMsg: '"quantity" is required' };
//   }

//   if (!sales.every((sale) => sale.quantity >= 1)) {
//     return {
//       isValid: false,
//       errCode: 400,
//       errMsg: '"quantity" must be greater than or equal to 1',
//     };
//   }
// };

// const create = async (sales) => {
//   // if (validateRequest(sales).isValid === false) return false; 
// };

// module.exports = {
//   create,
// };