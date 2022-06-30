const express = require('express');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const productsRouter = require('./routers/Products');

app.use('/products', productsRouter);

const salesRouter = require('./routers/Sales');

app.use('/sales', salesRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;