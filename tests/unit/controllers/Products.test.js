const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../services/Products');
const ProductsController = require('../../../controllers/Products');
const { productsDb } = require('../mockDb');
const { response } = require('express');

describe('Controller - Lista todos os produtos através da rota "/products"', () => {
  describe('quando é retornado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(productsDb);
      
      sinon.stub(ProductService, 'getAll').resolves(productsDb);
    });

    after(() => ProductService.getAll.restore());

    it('é chamado o status com o código 200', async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com as informações do produto buscado', async () => {
      await ProductsController.getAll(request, response);

      expect(response.json.calledWith(productsDb)).to.be.equal(true);
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
      response.json = sinon.stub().returns(productsDb[(request.params - 1)]);

      sinon.stub(ProductService, 'findById').resolves(productsDb[(request.params - 1)]);
    })

    after(() => ProductService.findById.restore());

    it('é chamado o status com o código 200', async () => {
      await ProductsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com as informações do produto buscado', async () => {
      await ProductsController.findById(request, response);

      expect(response.json.calledWith(productsDb[0])).to.be.equal(true);
    });
  });

  describe('quando o produto não é encontrado', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = 7;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(productsDb[(request.params - 1)]);

      sinon.stub(ProductService, 'findById').resolves(productsDb[(request.params - 1)]);
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

describe('Controller - Busca um produto pelo nome através da roda GET "/products/search"', () => {
  const request = {};
  const response = {};
  
  describe('quando é encontrado com sucesso', () => {
    
    before(() => {
      request.query = { q: 'Mar' };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'search').resolves(productsDb[0]);
    });
    
    after(() => ProductService.search.restore());

    it('é chamado o status com o código 200', async () => {
      await ProductsController.search(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com as informações do produto buscado', async () => {
      await ProductsController.search(request, response);

      expect(response.json.calledWith(productsDb[0])).to.be.equal(true);
    });
    
  });
  
  describe('quando a busca passa vazia', () => {
    
    before(() => {
      request.query = { q: '' };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'search').resolves(productsDb);
    });
    
    after(() => ProductService.search.restore());

    it('é chamado o status com o código 200', async () => {
      await ProductsController.search(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('retorna um objeto com as informações do produto buscado', async () => {
      await ProductsController.search(request, response);
  
      expect(response.json.calledWith(productsDb)).to.be.equal(true);
    });
    
  });
});

describe('Controller - Insere um novo produto no DB através da rota POST "/products"', () => {
  describe('quando é inserido com sucesso', () => {
    const request = {};
    const response = {};
    const PRODUCT_TEST = {
      id: 4,
      name: 'Capa da Invisibilidade',
    }

    before(() => {
      request.body = { name: 'Capa da Invisibilidade' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'create').resolves(PRODUCT_TEST);
    });

    after(() => ProductService.create.restore());

    it('é chamado o status com o código 201', async () => {
      await ProductsController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um objeto com as chaves "id" e "name"', async () => {
      await ProductsController.create(request, response);

      expect(response.json.calledWith(PRODUCT_TEST)).to.be.equal(true);
    });
  });

  // describe('quando o nome não é informado', () => {
  //   const request = {};
  //   const response = {};

  //   before(() => {
  //     request.body = { name: '' };

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();

  //     sinon.stub(ProductService, 'create').resolves({ err: 400 });
  //   });

  //   after(() => ProductService.create.restore());

  //   it('é chamado o status com o código 400', async () => {
  //     await ProductsController.create(request, response);

  //     expect(response.status.calledWith(400)).to.be.equal(true);
  //   });

  //   it('retorna um objeto com a mensagem de erro ""name" is required"', async () => {
  //     await ProductsController.create(request, response);
  //     const errorMsg = { message: '"name" is required' };

  //     expect(response.json.calledWith(errorMsg)).to.be.equal(true);
  //   });
  // });

  // describe('quando o nome informado é inválido', () => {
  //   const request = {};
  //   const response = {};

  //   before(() => {
  //     request.body = {};

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();

  //     sinon.stub(ProductService, 'create').resolves({ err: 422 });
  //   });

  //   after(() => ProductService.create.restore());

  //   it('é chamado o status com o código 422', async () => {
  //     await ProductsController.create(request, response);

  //     expect(response.status.calledWith(422)).to.be.equal(true);
  //   });

  //   it('retorna um objeto com a mensagem de erro ""name" length must be at least 5 characters long"', async () => {
  //     await ProductsController.create(request, response);
  //     const errorMsg = { message: '"name" length must be at least 5 characters long' };

  //     expect(response.json.calledWith(errorMsg)).to.be.equal(true);
  //   });
  // })
});

describe('Controller - Altera o nome de um produto no DB através da rota PUT "/products/:id"', () => {
  describe('quando é alterado com sucesso', () => {
    const request = {};
    const response = {};
    const PRODUCT_TEST = {
      id: 1,
      name: 'Tábua de Esmeralda',
    };

    before(() => {
      request.body = { name: PRODUCT_TEST.name };
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'update').resolves(PRODUCT_TEST);
    });

    after(() => ProductService.update.restore());

    it('é chamado o status com o código 200', async () => {
      await ProductsController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com as chaves "id" e "name"', async () => {
      await ProductsController.update(request, response);

      expect(response.json.calledWith(PRODUCT_TEST)).to.be.equal(true);
    });
  });

  // describe('quando o id informado é inválido', () => {
  //   const request = {};
  //   const response = {};

  //   before(() => {
  //     request.body = { name: 'Tábua de Esmeralda' };
  //     request.params = { id: 7 };

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();

  //     sinon.stub(ProductService, 'update').resolves({ isValid: false, err: 404 });
  //   });

  //   after(() => ProductService.update.restore());

  //   it('é chamado o status com o código 404', async () => {
  //     await ProductsController.update(request, response);

  //     expect(response.status.calledWith(404)).to.be.equal(true);
  //   });

  //   it('retorna um objeto com a mensagem de erro "Product not found"', async () => {
  //     await ProductsController.update(request, response);
  //     const errorMsg = { message: 'Product not found' };

  //     expect(response.json.calledWith(errorMsg)).to.be.equal(true);
  //   });
  // });
});

describe('Controller - Remove um produto no BD através da rota DELETE "/products/:id"', () => {
  const response = {};
  const request = {};

  describe('quando deletado com sucesso', () => {
    before(() => {
      request.params = 1;

      response.status = sinon.stub().returns(response);
      response.end = sinon.stub();
      sinon.stub(ProductService, 'remove').resolves({ removed: true });
    });

    after(() => ProductService.remove.restore());

    it('é chamado o status com o código 204', async () => {
      await ProductsController.remove(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });

  // describe('quando o id informado é inválido', () => {
  //   before(() => {
  //     request.params = 7;

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
  //     sinon.stub(ProductService, 'remove').resolves({ isValid: false });
  //   });

  //   after(() => ProductService.remove.restore());

  //   it('é chamado o status com o código 404', async () => {
  //     await ProductsController.remove(request, response);

  //     expect(response.status.calledWith(404)).to.be.equal(true);
  //   });

  //   it('retorna um objeto com a mensagem de erro "Product not found"', async () => {
  //     await ProductsController.remove(request, response);
  //     const errorMsg = { message: 'Product not found' };

  //     expect(response.json.calledWith(errorMsg)).to.be.equal(true);
  //   });
  // });
});