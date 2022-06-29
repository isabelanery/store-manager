const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/Products');
const db = require('../mockDb');

describe('Model - Lista todos os produtos através da rota GET "/products"', () => {

  before(async () => {
    const execute = [db];

    sinon.stub(connection, 'execute').returns(execute);
  })

  after(async () => {
    connection.execute.restore();
  })
  
  describe('quando é retornado com sucesso', () => {
    it('retorna um array de objetos', async () => {
      const response = await ProductModel.getAll();

      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });

  });
});


describe('Model - Encontra um produto através da rota GET "/products/:id"', () => {
  describe('quando o produto é encontrado com sucesso', () => {
    before(async () => {
      const execute = [db[0]];
      sinon.stub(connection, 'execute').returns(execute);
    });

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um objeto', async () => {
      const ID_TEST = 1;
      const response = await ProductModel.findById(ID_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui uma chave com o nome do produto', async () => {
      const ID_TEST = 1;
      const NAME_TEST = db[0].name;
      const response = await ProductModel.findById(ID_TEST);

      expect(response).to.have.a.property('name');
      expect(response.name).to.equal(NAME_TEST);
    });
  });
});

describe('Model - Insere um novo produto no DB através da rota POST "/products"', () => {
  describe('quando é inserido com sucesso', () => {
    const newProduct = {
      name: 'Capa da Invisibilidade',
    };
    
    before(async () => {
      const execute = [{ insertId: 4, ...newProduct }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => connection.execute.restore() )

    it('retorna um objeto', async () => {
      const response = await ProductModel.create(newProduct);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductModel.create(newProduct);

      expect(response).to.have.a.property('id');
    });
  });
});