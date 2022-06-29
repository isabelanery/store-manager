const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/Products');

const db = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  }
];

describe('M - Lista todos os produtos através da rota "/products"', () => {

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


describe('M - Encontra um produto através da rota "/products/:id"', () => {
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

      expect(response).to.contain.keys('name');
      expect(response.name).to.equal(NAME_TEST);
    });
  });

  // describe('quando o produto não é encontrado', () => {
    
  // });
});