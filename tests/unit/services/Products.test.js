const { expect } = require('chai');
const sinon = require('sinon');

const ProductModel = require('../../../models/Products');
const ProductService = require('../../../services/Products');

const { productsDb } = require('../mockDb');

describe('Service - Lista todos os produtos através da rota "/products"', () => {
  describe('quando é retornado com sucesso', () => {
    before(() => {
      sinon.stub(ProductModel, 'getAll').resolves(productsDb);
    });

    after(() => { ProductModel.getAll.restore(); })
    
    it('retorna um array de objetos', async () => {
      const response = await ProductService.getAll();

      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });
  });
});

describe('Service - Encontra um produto através da rota "/products/:id"', () => {
  before(() => {
    const findByIt = [productsDb[0]];
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
      const NAME_TEST = productsDb[0].name;
      const response = await ProductService.findById(ID_TEST);

      expect(response).to.contain.keys('name');
      expect(response.name).to.equal(NAME_TEST);
    });
  });
});

describe('Service - Insere um novo produto no DB através da rota POST "/products"', () => {
  describe('quando é inserido com sucesso', () => {
    const newProduct = {
      name: 'Capa da Invisibilidade',
    };

    before(async () => {
      const ID_TEST = 4;

      sinon.stub(ProductModel, 'create').resolves({ id: ID_TEST });
    });

    after(async () => ProductModel.create.restore())

    it('retorna um objeto', async () => {
      const response = await ProductService.create(newProduct);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductService.create(newProduct);

      expect(response).to.have.a.property('id');
    });
  });

  describe('quando o nome informado é inválido', () => {
    const newProduct = {};

    it('retorna um objeto', async () => {
      const response = await ProductService.create(newProduct);
      expect(response).to.be.an('object');
    });

    it('tal objeto contém uma chave "isNameValid" com o valor "false"', async () => {
      const response = await ProductService.create(newProduct);
      expect(response).to.contain.property('isNameValid');
      expect(response.isNameValid).to.be.equal(false);
    });

    it('tal objeto contém uma chave "err", que informa porque o nome não foi validado', async () => {
      const response = await ProductService.create(newProduct);
      expect(response).to.contain.property('err');
    });
  });
});
