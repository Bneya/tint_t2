var express = require('express');
const cors = require('cors');
const indexRouter = require('./src/routers');
// const indexRouter = require('./routes/index');
// const axios = require('axios');
// import './styles.css';

// Import ORM models
models = require('./src/models');

// Create app and add middlewares
var app = express();

app.use(cors())

// Mostrando interfaz de axios para todas las requests
// const axiosInstance = axios.create({
//   baseURL: 'https://tarea-1-breaking-bad.herokuapp.com/api',
// })

// Modificador de respuesta
// const responseHandler = (response) => {
//   return response.data;
// }

// axiosInstance.interceptors.response.use(responseHandler, (error) =>
//   Promise.reject(error),
// )

app.use((req, res, next) => {
  // console.log("req", req);
  // req.axiosInstance = axiosInstance;
  req.models = models;

  return next();
});


// Permite sacar POST params
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Carga las rutas con el router
// app.use(`/`, indexRouter)

// Load env variables
require('dotenv').config();

// Carga las rutas con el router
app.use(`/`, indexRouter)

// Home route
app.get('/', async function (req, res) {
  const artists = await req.models.tartist.findAll({ include: req.models.talbum });
  console.log('artists', artists);
  res.send(`Hello World!, ${artists[0]}`);
  // res.redirect('/seasons');
});

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
