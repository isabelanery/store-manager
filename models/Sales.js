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
          (SELECT id FROM StoreManager.products WHERE id = ?),
          ?)`,
      [saleId, sale.productId, sale.quantity],
    );
  });

  return {
    id: saleId,
  };
};

const serializeAll = (data) => ({
  saleId: data.sale_id,
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id;`,
  );

  return sales.map(serializeAll);
};

const serializeById = (data) => ({
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
    WHERE s.id = ?`,
    [id],
  );

  if (sale.length === 0) return null;

  return sale.map(serializeById);
};

const update = async ({ saleId, itemsUpdated }) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?`,
    [itemsUpdated.quantity, saleId, itemsUpdated.productId],
  );
  return result;
};

const remove = async (id) => {
  const [response] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return response;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
