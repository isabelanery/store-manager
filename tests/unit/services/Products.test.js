const { expect } = require('chai');
const sinon = require('sinon');

const ProductModel = require('../../../models/Products');
const ProductService = require('../../../services/Products');

const db = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

describe('S - Lista todos os produtos através da rota "/products"', () => {
  describe('quando é retornado com sucesso', () => {
    before(() => {
      sinon.stub(ProductModel, 'getAll').resolves(db);
    });

    after(() => { ProductModel.getAll.restore(); })
    
    it('retorna um array de objetos', async () => {
      const response = await ProductService.getAll();

      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });
  });
});

describe('S - Encontra um produto através da rota "/products/:id"', () => {
  before(() => {
    const findByIt = [db[0]];
    sinon.stub(ProductModel, 'findById').resolves(findByIt);
  });

  after(() => { ProductModel.findById.restore(); })


  describe('quando o produto é encontrado com sucesso', () => {
    
    
    it('retorna um objeto', async () => {
      const ID_TEST = 1;
      const response = await ProductService.findById(ID_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui uma chave com o nome do produto', async () => {
      const ID_TEST = 1;
      const NAME_TEST = db[0].name;
      const response = await ProductService.findById(ID_TEST);

      expect(response).to.contain.keys('name');
      expect(response.name).to.equal(NAME_TEST);
    });
  });
})