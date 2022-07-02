const express = require('express');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const productsRouter = require('./routers/Products');
const salesRouter = require('./routers/Sales');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;