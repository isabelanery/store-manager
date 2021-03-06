const { expect } = require('chai');
const sinon = require('sinon');

const SalesService = require('../../../services/Sales');
const SalesModel = require('../../../models/Sales');
const ProductModel = require('../../../models/Products');
const { productsDb } = require('../mockDb');
const { salesDb, saleDb } = require('../mockDb');

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
  });
});

describe('Service - Lista todas as vendas através da rota "/sales"', () => {
  describe('quando é retornado com sucesso', () => {
    before(() => {
      sinon.stub(SalesModel, 'getAll').resolves(salesDb);
    });

    after(() => { SalesModel.getAll.restore(); })
    
    it('retorna um array de objetos', async () => {
      const response = await SalesService.getAll();

      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });

    it('tais objetos possuem uma chave "saleId" com o id do produto e as informações da venda', async () => {
      const ID_TEST = 1;
      const SALEID_TEST = salesDb[0].saleId;
      const response = await SalesService.getAll(ID_TEST);

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0].saleId).to.equal(SALEID_TEST);
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

describe('Service -  Encontra uma venda através da rota GET "/sales/:id"', () => {
  describe('quando é encontrada com sucesso', () => {
    before(() => {
      sinon.stub(SalesModel, 'findById').returns(saleDb);
      sinon.stub(SalesModel, 'getAll').resolves(salesDb);
    });

    after(() => {
      SalesModel.findById.restore();
      SalesModel.getAll.restore();
    });

    it('retorna um array de objetos', async () => {
      const ID_TEST = 1;
      const response = await SalesService.findById(ID_TEST);

      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });

    it('tais objetos possuem uma chave "productId" com o id do produto e as informações da venda', async () => {
      const ID_TEST = 1;
      const response = await SalesService.findById(ID_TEST);

      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('quantity');
    });
  });

  describe('quando o id informado é inválido', () => {
    before(() => {
      sinon.stub(SalesModel, 'findById').resolves({ isValid: false });
      sinon.stub(SalesModel, 'getAll').resolves(salesDb);
    });

    after(() => {
      SalesModel.findById.restore();
      SalesModel.getAll.restore();
    });

    const ID_TEST = 7
    it('retorna um boolean', async () => {
      const response = await SalesService.findById(ID_TEST);

      expect(response).to.be.an('boolean');
    });

    it('tal boolen tem o valor false', async () => {
      const response = await SalesService.findById(ID_TEST);

      expect(response).to.equal(false);
    });
  });
});

describe('Service - Altera o nome de uma venda no DB através da rota PUT "/sales/:id"', () => {
  describe('quando é alterado com sucesso', () => {
    const SALE_TEST = {
      saleId: 1,
      itemsUpdated: [
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

    const MOCK_MODEL = { affectedRows: SALE_TEST.itemsUpdated.length };

    before(() => {
      sinon.stub(SalesModel, 'update').resolves(MOCK_MODEL);
    });

    after(() => {
      SalesModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.update(SALE_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto contém a chave "affectedRows" com o número de linhas alteradas', async () => {
      const response = await SalesService.update(SALE_TEST);

      expect(response).to.have.a.property('affectedRows');
    });
  });
});

describe('Service - Remove uma venda no BD através da rota DELETE "/sales/:id"', () => {
  describe('quando deletada com sucesso', () => {
    const SALE_TEST = 1;
    const MOCK_MODEL = { affectedRows: 1 };

    before(() => {
      sinon.stub(SalesModel, 'remove').resolves(MOCK_MODEL);
    });

    after(() => {
      SalesModel.remove.restore();
    });
    
    it('retorna um objeto', async () => {
      const response = await SalesService.remove(SALE_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto contém a chave "affectedRows" com o valor true', async () => {
      const response = await SalesService.remove(SALE_TEST);

      expect(response).to.have.a.property('affectedRows');
      // expect(response.affectedRows).to.be.equal(1);
    });
  });
});