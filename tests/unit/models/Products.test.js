const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/Products');
const { productsDb, saleDb } = require('../mockDb');

describe('Model - Lista todos os produtos através da rota GET "/products"', () => {

  before(async () => {
    const execute = [productsDb];

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

describe('Model - Insere um novo produto no BD através da rota POST "/products"', () => {
  describe('quando é inserido com sucesso', () => {
    const newProduct = {
      name: 'Capa da Invisibilidade',
    };
    
    before(async () => {
      const execute = [{ insertId: 4 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => connection.execute.restore() )

    it('retorna um objeto', async () => {
      const response = await ProductModel.create(newProduct);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductModel.create(newProduct);

      expect(response).to.have.a.property('id');
    });
  });
});

describe('Model - Encontra um produto através da rota GET "/products/:id"', () => {
  describe('quando o produto é encontrado com sucesso', () => {
    before(async () => {
      const execute = [productsDb[0]];
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
      const NAME_TEST = productsDb[0].name;
      const response = await ProductModel.findById(ID_TEST);

      expect(response).to.have.a.property('name');
      expect(response.name).to.equal(NAME_TEST);
    });
  });
});

describe('Model - Busca um produto pelo nome através da roda GET "/products/search"', () => {
  describe('quando é encontrado com sucesso', () => {
    before(async () => {
      const execute = [[productsDb[0]]];
      sinon.stub(connection, 'execute').returns(execute);
    });

    after(async () => {
      connection.execute.restore();
    })


    it('retorna um array de objetos', async () => {
      const response = await ProductModel.search();

      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });
  });
});

describe('Model - Altera o nome de um produto no BD através da rota PUT "/products/:id"', () => {
  describe('quando alterado com sucesso', () => {
    const PRODUCT_TEST = [{ id: 1, name: 'Pedra Filosofal' }];
    const MOCK_TEST = [{ affectedRows: 1 }];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(MOCK_TEST);
    });

    after(async () => connection.execute.restore());

    it('retorna um objeto', async () => {
      const response = await ProductModel.update(PRODUCT_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto contém a chave "affectedRows" com o valor 1', async () => {
      const response = await ProductModel.update(PRODUCT_TEST);
      
      expect(response).to.have.a.property('affectedRows');
      expect(response.affectedRows).to.be.equal(1);
    });
  });
});

describe('Model - Remove um produto no BD através da rota DELETE "/products/:id"', () => {
  describe('quando deletado com sucesso', () => {
    const PRODUCT_TEST = { id: 1 };
    const MOCK_TEST = { affectedRows: 1 };

    before(async () => {
      const execute = [MOCK_TEST];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => connection.execute.restore());

    it('retorna um objeto', async () => {
      const response = await ProductModel.remove(PRODUCT_TEST);

      expect(response).to.be.an('object');
    });

    it('tal objeto contém a chave "affectedRows" com o valor 1', async () => {
      const response = await ProductModel.remove(PRODUCT_TEST);

      expect(response).to.have.a.property('affectedRows');
      expect(response.affectedRows).to.be.equal(1);
    });
  });
});