const connection = require('./connection');

const create = async (sales) => {
  const [result] = await connection.execute(
    'INSERT INTO sales (date) VALUES(NOW())',
  );

  const saleId = result.insertId;

  sales.forEach(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, sale.productId, sale.quantity],
    );
  });

  return {
    id: saleId,
    itemsSold: sales,
  };
};

module.exports = {
  create,
};
