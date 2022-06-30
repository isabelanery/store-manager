const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');

const SalesModel = require('../../../models/Sales');
const { salesDb } = require('../mockDb');

describe('Model - Insere uma nova venda no DB através da rota POST "/sales"', () => {
  describe('quando é inserido com sucesso', () => { 
    const payload = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];

    const result = {
      "id": 3,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    }

    before(async () => {
      const execute = [result];

      sinon.stub(connection, 'execute').resolves(execute);
    });
    
    after(async () => connection.execute.restore());

    it('retorna um objeto', async () => {
      const response = await SalesModel.create(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a chave "id"', async () => {
      const response = await SalesModel.create(payload);

      expect(response).to.have.a.property('id');
    });
  })
});

describe('Model - Lista todos os produtos através da rota GET "/sales"', () => {

  describe('quando é retornado com sucesso', () => {
    before(async () => {
      const execute = [salesDb]

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => connection.execute.restore());

    it('retorna um array de objetos', async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });

    it('tais objetos possuem uma chave "productId" com o id do produto e as informações da venda', async () => {
      const ID_TEST = 1;
      const PRODUCTID_TEST = salesDb[0].productId;
      const response = await SalesModel.getAll(ID_TEST);

      expect(response[0]).to.have.a.property('productId');
      expect(response[0].productId).to.equal(PRODUCTID_TEST);
    });
  });
});

describe('Model - Encontra um produto através da rota GET "/sales/:id"', () => {
  describe('quando o produto é encontrado com sucesso', () => {
    before(async () => {
      const execute = [salesDb[0]];
      sinon.stub(connection, 'execute').returns(execute);
    });

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um objeto', async () => {
      const ID_TEST = 1;
      const response = await SalesModel.findById(ID_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui uma chave "productId" com o id do produto e as informações da venda', async () => {
      const ID_TEST = 1;
      const PRODUCTID_TEST = salesDb[0].productId;
      const response = await SalesModel.findById(ID_TEST);

      expect(response).to.have.a.property('productId');
      expect(response.productId).to.equal(PRODUCTID_TEST);
    });
  });
});