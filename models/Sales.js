const connection = require('./connection');

const create = async (data) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES(NOW())',
  );

  const saleId = result.insertId;

  const sales = !Array.isArray(data) ? [data] : data;
  sales.forEach(async (sale) => {
    await connection.execute(

      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
        VALUES (
          ?,
          (SELECT id FROM products WHERE id = ?),
          ?)`,
      [saleId, sale.productId, sale.quantity],
    );
  });

  return {
    id: saleId,
    // itemsSold: sales,
  };
};

const getAll = () => {
  // const [sales] = await connection.execute(
  //   'SELECT * FROM StoreManager.sales',
  // )
};

const findById = () => {

};

module.exports = {
  create,
  getAll,
  findById,
};
