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

const update = async ({ id, name }) => {
  const [response] = await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
    [name, id],
  );

  return response;
};

const remove = async (id) => {
  const [response] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return response;
};

const search = async (name) => {
  const [response] = await connection.execute(
    `SELECT * FROM StoreManager.products 
    WHERE name LIKE ?`,
    [`%${name}&`],
  );

  return response;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  search,
};