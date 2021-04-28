var express = require('express');
const cors = require('cors');
const indexRouter = require('./src/routers');

// Import ORM models
models = require('./src/models');

// Create app and add middlewares
var app = express();

app.use(cors())

app.use((req, res, next) => {
  req.models = models;

  return next();
});


// Permite sacar POST params
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Load env variables
require('dotenv').config();

// Carga las rutas con el router
app.use(`/`, indexRouter)

// Si se llega a esta ruta es que no se encontró lo que se buscaba
app.use((req, res, next) => {
  console.log('llegamos hasta después del index router');
  res.status(405);
  res.send('Método no aceptado')
})

// Home route
app.get('/', async function (req, res) {

  res.send('Bienvenido a la API de música WimeLire')
});

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
