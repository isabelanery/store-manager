const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );

  return products;
};

const findById = async (id) => {
  const [product] = await connection.execute(
    `SELECT id, name
    FROM products
    WHERE id = ?`, [id],
  );

  if (product.length === 0) return null;

  return product;
};

const create = async ({ name }) => {
  const [response] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)', [name],
  );

  return {
    id: response.insertId,
  };
};

module.exports = {
  getAll,
  findById,
  create,
};