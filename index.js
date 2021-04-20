var express = require('express');
const cors = require('cors');
// const indexRouter = require('./routes/index');
// const axios = require('axios');
// import './styles.css';

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

// Home route
app.get('/', function (req, res) {
  res.send('Hello World!');
  // res.redirect('/seasons');
});

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
