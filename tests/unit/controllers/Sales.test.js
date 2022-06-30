const { express, expect } = require('chai');
const sinon = require('sinon');

const SalesControler = require('../../../controllers/Sales');
const SalesService = require('../../../services/Sales');

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