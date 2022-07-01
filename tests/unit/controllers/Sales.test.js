const { express, expect } = require('chai');
const sinon = require('sinon');

const SalesControler = require('../../../controllers/Sales');
const SalesService = require('../../../services/Sales');
const { salesDb, saleDb } = require('../mockDb');

describe('Controller - Insere uma nova venda no DB através da rota POST "/sales"', () => {
  
  describe('quando é inserido com sucesso', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'create').resolves({ id: 3 });
    });

    after(() => SalesService.create.restore());

    it('é chamado o status com o código 201', async () => {
      await SalesControler.create(request, response);
      
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um objeto com as chaves "id" e "itemsSold"', async () => {
      await SalesControler.create(request, response);

      const RESULT_TEST = {
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
      };

      expect(response.json.calledWith(RESULT_TEST)).to.be.equal(true);
    });
  });
  
  describe('quando o payload informado é inválido', () => {
    const request = {};
    const response = {};

    describe('porque não contém a chave "productId"', () => { 
      before(() => {
        request.body = [{ quantity: 1 }];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        const serviceReturn = { isValid: false, err: { code: 400, message: '"productId" is required' } };
        sinon.stub(SalesService, 'create').resolves(serviceReturn);
      });

      after(() => SalesService.create.restore());

      it('é chamado o status com o código 400', async () => {
        await SalesControler.create(request, response);
        
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('retorna um objeto com a mensagem de erro correta', async () => {
        await SalesControler.create(request, response);

        const errorMsg = { message: '"productId" is required' };
        expect(response.json.calledWith(errorMsg)).to.be.equal(true);
      });
    });
    
    describe('porque não existe um produto com o "productId" enviado', () => { 
      before(() => {
        request.body = [{ productId: 7, quantity: 1 }];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        const serviceReturn = { isValid: false, err: { code: 404, message: 'Product not found' } };
        sinon.stub(SalesService, 'create').resolves(serviceReturn);
      });

      after(() => SalesService.create.restore());

      it('é chamado o status com o código 404', async () => {
        await SalesControler.create(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('retorna um objeto com a mensagem de erro correta', async () => {
        await SalesControler.create(request, response);

        const errorMsg = { message: 'Product not found' };
        expect(response.json.calledWith(errorMsg)).to.be.equal(true);
      })
    });
    
    describe('porque não contém a chave "quantity"', () => { 
      before(() => {
        request.body = [{ productId: 1 }];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        const serviceReturn = { isValid: false, err: { code: 400, message: '"quantity" is required' } };
        sinon.stub(SalesService, 'create').resolves(serviceReturn);
      });

      after(() => SalesService.create.restore());

      it('é chamado o status com o código 400', async () => {
        await SalesControler.create(request, response);

        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('retorna um objeto com a mensagem de erro correta', async () => {
        await SalesControler.create(request, response);

        const errorMsg = { message: '"quantity" is required' };
        expect(response.json.calledWith(errorMsg)).to.be.equal(true);
      })
    });
    
    describe('porque o campo "quantity" é menor ou igual a 0 (Zero)', () => { 
      before(() => {
        request.body = [{ productId: 1, quantity: 0 }];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        const serviceReturn = {
          isValid: false,
          err: {
            code: 422, message: '"quantity" must be greater than or equal to 1',
          },
        };

        sinon.stub(SalesService, 'create').resolves(serviceReturn);
      });

      after(() => SalesService.create.restore());

      it('é chamado o status com o código 422', async () => {
        await SalesControler.create(request, response);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('retorna um objeto com a mensagem de erro correta', async () => {
        await SalesControler.create(request, response);

        const errorMsg = { message: '"quantity" must be greater than or equal to 1' };
        expect(response.json.calledWith(errorMsg)).to.be.equal(true);
      })
    });
  });
});

describe('Controller - Lista todas as vendas através da rota "/sales"', () => {
  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(salesDb);

    sinon.stub(SalesService, 'getAll').resolves(salesDb);
  });

  after(() => SalesService.getAll.restore());

  describe('quando é retornado com sucesso', () => {
    it('é chamado o status com o código 200', async () => {
      await SalesControler.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array com a lista de vendas', async () => {
      await SalesControler.getAll(request, response);

      expect(response.json.calledWith(salesDb)).to.be.equal(true);
    });
  });
});

describe('Controller - Testa a rota "/sales/:id"', () => {
  const request = {};
  const response = {};

  describe('quando a venda é encontrada com sucesso', () => {
    before(() => {
      request.params = 1;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(saleDb[(request.params - 1)]);
      
      sinon.stub(SalesService, 'getAll').resolves(salesDb);
      sinon.stub(SalesService, 'findById').resolves(saleDb);
    });

    after(() => {
      SalesService.findById.restore();
      SalesService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SalesControler.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com as informações da venda buscada', async () => {
      await SalesControler.findById(request, response);

      expect(response.json.calledWith(saleDb)).to.be.equal(true);
    });
  });

  describe('quando a venda não é encontrada', () => {
    before(() => {
      request.params = 1;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns({ message: 'Sale not found' });

      sinon.stub(SalesService, 'getAll').resolves(salesDb);
      sinon.stub(SalesService, 'findById').resolves(false);
    });

    after(() => {
      SalesService.findById.restore();
      SalesService.getAll.restore();
    });
    
    it('é chamado o status com o código 404', async () => {
      await SalesControler.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('retorna um objeto com a mensagem de erro: "Sale not found"', async () => {
      await SalesControler.findById(request, response);

      const errorMsg = { message: 'Sale not found' };
      expect(response.json.calledWith(errorMsg)).to.be.equal(true);
    });
  });
});

describe('Controller - Altera as informações da venda no DB através da rota PUT "/sales/:id"', () => {
  const request = {};
  const response = {};

  describe('quando é alterado com sucesso', () => {
    const SALE_TEST = {
      saleId: 1,
      saleUpdate: [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ],
    };
    
    before(() => {
      request.body = SALE_TEST.saleUpdate;
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });


    it('é chamado o status com o código 200', async () => {
      await SalesControler.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com as chaves "id" e "name"', async () => {
      await SalesControler.update(request, response);

      expect(response.json.calledWith(SALE_TEST)).to.be.equal(true);
    });

    describe('quando o id da venda informado é inválido', () => {

      before(() => {
        request.body = SALE_TEST.saleUpdate;
        request.params = { id: 7 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('é chamado o status com o código 404', async () => {
        await SalesControler.update(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('retorna um objeto com a mensagem de erro "Sale not found"', async () => {
        await SalesControler.update(request, response);
        const errorMsg = { message: 'Sale not found' };

        expect(response.json.calledWith(errorMsg)).to.be.equal(true);
      });

    });
  });
});