var express = require('express');
const schemaValidator = require('../schemas/schemaValidator');
const { artistSchemas } = require('../schemas')

const router = express.Router()

// Todas las rutas de esta categoría
router.get(`/`, function (req, res) {
  res.send('Hello artists!');
})

router.post(
  '/',
  schemaValidator(artistSchemas.createArtist),
  function (req, res) {
    res.send('pasamos el validator')
  }
)






module.exports = router;
