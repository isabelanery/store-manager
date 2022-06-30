const { expect } = require('chai');
const sinon = require('sinon');

const SalesService = require('../../../services/Sales');
const SalesModel = require('../../../models/Sales');
const ProductModel = require('../../../models/Products');
const { productsDb } = require('../mockDb');
const { salesDb } = require('../mockDb');

describe('Service - Insere uma nova venda no DB através da rota POST "/sales"', () => {
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

    before(() => {
      const ID_TEST = 4;

      sinon.stub(SalesModel, 'create').resolves({ id: ID_TEST });
      sinon.stub(ProductModel, 'getAll').resolves(productsDb);
    });

    after(() => {
      SalesModel.create.restore();
      ProductModel.getAll.restore();
    });
    
    it('retorna um objeto', async () => {
      const response = await SalesService.create(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a chave "id"', async () => {
      const response = await SalesService.create(payload);

      expect(response).to.have.a.property('id');
    });

    // it('tal objeto possui a chave "itemsSold", e seu valor é um array contendo o corpo da requisição', async () => {
    //   const response = await SalesService.create(payload);

    //   expect(response).to.have.a.property('itemsSold');
    //   expect(response.itemsSold).to.be.an('array');
    //   expect(response.itemsSold).to.equal(payload);
    // });
  });

  describe('quando não é possível cadastrar uma nova venda', () => {

    before(() => {
      const ID_TEST = 4;

      sinon.stub(SalesModel, 'create').resolves({ id: ID_TEST });
      sinon.stub(ProductModel, 'getAll').resolves(productsDb);
    });

    after(() => {
      SalesModel.create.restore();
      ProductModel.getAll.restore();
    });

    describe('porque a requisição está sem o campo "productId"', () => {
      const newSale = [{ quantity: 2 }];
      it('retorna um objeto', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.be.an('object');
      });

      it('tal objeto contém uma chave "isValid" com o valor "false"', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.contain.property('isValid');
        expect(response.isValid).to.be.equal(false);
      });

      it('tal objeto contém uma chave "err"', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.contain.property('err');
      });
    });

    describe('porque não existe um produto com o "productId", em uma requisição com um único item', () => {
      const newSale = { productId: 7, quantity: 2 };
      it('retorna um objeto', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.be.an('object');
      });

      it('tal objeto contém uma chave "isValid" com o valor "false"', async () => {
        const response = await SalesService.create(newSale);

        expect(response).to.contain.property('isValid');
        expect(response.isValid).to.be.equal(false);
      });

      it('tal objeto contém uma chave "err"', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.contain.property('err');
      });
    });

    describe('porque não existe um produto com o "productId", em uma requisição com vários itens', () => {
      const newSale = [{ productId: 7, quantity: 2 }, { productId: 13, quantity: 6 }];
      it('retorna um objeto', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.be.an('object');
      });

      it('tal objeto contém uma chave "isValid" com o valor "false"', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.contain.property('isValid');
        expect(response.isValid).to.be.equal(false);
      });

      it('tal objeto contém uma chave "err"', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.contain.property('err');
      });
    });

    // the next 02 describes are not working IDK WHY sos
    describe('porque a requisição está sem o campo "quantity"', () => {
      const newSale = [{ productId: 2 }];

      it('retorna um objeto', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.be.an('object');
      });

      it('tal objeto contém uma chave "isValid" com o valor "false"', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.contain.property('isValid');
        expect(response.isValid).to.be.equal(false);
      });

      it('tal objeto contém uma chave "err"', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.contain.property('err');
      });
    });

    describe('com o campo "quantity" menor ou igual a 0 (Zero)', () => {
      const newSale = [{ productId: 2, quantity: 0 }];

      it('retorna um objeto', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.be.an('object');
      });

      it('tal objeto contém uma chave "isValid" com o valor "false"', async () => {
        const response = await SalesService.create(newSale);
        expect(response).to.contain.property('isValid');
        expect(response.isValid).to.be.equal(false);
      });

      it('tal objeto contém uma chave "err"', async () => {
        const response = await SalesService.create(newSale);
        const errMsg = '"quantity" must be greater than or equal to 1';

        expect(response).to.contain.property('err');
        expect(response.err.message).to.be.equal(errMsg);
      });
    });
  });
});

describe('Service - Lista todas as vendas através da rota "/sales"', () => {
  describe('quando é retornado com sucesso', () => {
    // before(() => {
    //   sinon.stub(SalesModel, 'getAll').resolves(salesDb);
    // });

    // after(() => { SalesModel.getAll.restore(); })
    
    it('retorna um array de objetos', async () => {
      const response = await SalesService.getAll();

      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });

    it('tais objetos possuem uma chave "productId" com o id do produto e as informações da venda', async () => {
      const ID_TEST = 1;
      const PRODUCTID_TEST = salesDb[0].productId;
      const response = await SalesService.getAll(ID_TEST);

      expect(response[0]).to.have.a.property('productId');
      expect(response[0].productId).to.equal(PRODUCTID_TEST);
    });
  });
});

describe('Service -  Encontra um produto através da rota GET "/sales/:id"', () => {
  describe('quando a venda é encontrada com sucesso', () => {
    

    it('retorna um objeto', async () => {
      const ID_TEST = 1;
      const response = await SalesService.findById(ID_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui uma chave "productId" com o id do produto e as informações da venda', async () => {
      const ID_TEST = 1;
      const PRODUCTID_TEST = salesDb[0].productId;
      const response = await SalesService.findById(ID_TEST);

      expect(response).to.have.a.property('productId');
      expect(response).to.have.a.property('date');
      expect(response).to.have.a.property('quantity');
      expect(response.productId).to.equal(PRODUCTID_TEST);
    });
  });

  describe('quando o id informado é inválido', () => {
    it('retorna um objeto', async () => {
      const ID_TEST = 7
      const response = await SalesService.findById(ID_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui uma chave "isValid" com o valor false', async () => {
      const ID_TEST = 7
      const response = await SalesService.findById(ID_TEST);

      expect(response).to.have.a.property('isValid');
      expect(response.isValid).to.equal(false);
    });
  });
});