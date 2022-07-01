const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return products;
};

const findById = async (id) => {
  const [product] = await connection.execute(
    `SELECT id, name
    FROM StoreManager.products
    WHERE id = ?`, [id],
  );

  if (product.length === 0) return null;

  return product;
};

const create = async ({ name }) => {
  const [response] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );

  return {
    id: response.insertId,
    name,
  };
};

const update = async () => {

};

module.exports = {
  getAll,
  findById,
  create,
  update,
};