const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');

const SalesModel = {
  create: () => {}
}

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
    
    it('retorna um objeto', async () => {
      const response = await SalesModel.create(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a chave "id"', async () => {
      const response = await SalesModel.create(payload);

      expect(response).to.have.a.property('id');
    });

    it('tal objeto possui a chave "itemsSold", e seu valor é um array contendo o corpo da requisição', async () => {
      const response = await SalesModel.create(payload);

      expect(response).to.have.a.property('itemsSold');
      expect(response.itemsSold).to.be.an('array');
      expect(response.itemsSold).to.equal(payload);
    });
  })
});