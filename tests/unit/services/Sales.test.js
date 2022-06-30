const { expect } = require('chai');

const SalesService = {
  create: () => { },
}

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
    
    it('retorna um objeto', async () => {
      const response = await SalesService.create(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a chave "id"', async () => {
      const response = await SalesService.create(payload);

      expect(response).to.have.a.property('id');
    });

    it('tal objeto possui a chave "itemsSold", e seu valor é um array contendo o corpo da requisição', async () => {
      const response = await SalesService.create(payload);

      expect(response).to.have.a.property('itemsSold');
      expect(response.itemsSold).to.be.an('array');
      expect(response.itemsSold).to.equal(payload);
    });
  });

  describe('quando não é possível cadastrar uma nova venda', () => {
    describe('sem o campo "productId"', () => {
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

    describe('quando não existe um produto com o "productId", em uma requisição com um único item', () => {
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

    describe('quando não existe um produto com o "productId", em uma requisição com vários itens', () => {
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

    describe('sem o campo "quantity"', () => {    
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
        expect(response).to.contain.property('err');
      });
    });
    

    // it('', async () => {

    // });

    // it('', async () => {

    // });
  })
});