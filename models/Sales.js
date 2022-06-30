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

// const getNewSale = ({ sale_id, date, product_id, quantity})

const serialize = (data) => ({
  saleId: data.sale_id,
  data: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT * FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id;`,
  );

  return sales.map(serialize);
};

const findById = () => {

};

module.exports = {
  create,
  getAll,
  findById,
};
