const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../services/Products');
const ProductsController = require('../../../controllers/Products');
const db = require('../mockDb');


describe('Controller - Lista todos os produtos através da rota "/products"', () => {
  describe('quando é retornado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(db);
      
      sinon.stub(ProductService, 'getAll').resolves(db);
    });

    after(() => ProductService.getAll.restore());

    it('é chamado o status com o código 200', async () => {
      const test = await ProductsController.getAll(request, response);
      console.log(test);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com as informações do produto buscado', async () => {
      await ProductsController.getAll(request, response);

      expect(response.json.calledWith(db)).to.be.equal(true);
    });
  });
});

describe('Controller - Testa a rota "/products/:id"', () => {
  describe('quando o produto é encontrado com sucesso', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = 1;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(db[(request.params - 1)]);

      sinon.stub(ProductService, 'findById').resolves(db[(request.params - 1)]);
    })

    after(() => ProductService.findById.restore());

    it('é chamado o status com o código 200', async () => {
      await ProductsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com as informações do produto buscado', async () => {
      await ProductsController.findById(request, response);

      expect(response.json.calledWith(db[0])).to.be.equal(true);
    });
  });

  describe('quando o produto não é encontrado', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = 7;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(db[(request.params - 1)]);

      sinon.stub(ProductService, 'findById').resolves(db[(request.params - 1)]);
    })

    after(() => ProductService.findById.restore());

    it('é chamado o status com o código 404', async () => {
      await ProductsController.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('retorna um objeto com a mensagem de erro: "Product not found"', async () => {
      await ProductsController.findById(request, response);

      const errorMsg = { message: 'Product not found' };
      expect(response.json.calledWith(errorMsg)).to.be.equal(true);
    });
  });
})

describe('Controller - Insere um novo produto no DB através da rota POST "/products"', () => {
  describe('quando é inserido com sucesso', () => {
    

    it('', async () => {

    });
  });

  describe('quando o nome informado é inválido', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = { name: '' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it('é chamado o status com o código 400', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('retorna um objeto com a mensagem de erro ""name" is required"', async () => {
      await ProductsController.create(request, response);
      const errorMsg = { message: '"name" is required' };

      expect(response.json.calledWith(errorMsg)).to.be.equal(true);
    });
  });

  describe('quando o nome não é informado', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it('é chamado o status com o código 422', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('retorna um objeto com a mensagem de erro ""name" length must be at least 5 characters long"', async () => {
      await ProductsController.create(request, response);
      const errorMsg = { message: '"name" length must be at least 5 characters long' };

      expect(response.json.calledWith(errorMsg)).to.be.equal(true);
    });
  })
});
