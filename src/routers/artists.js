var express = require('express');
const schemaValidator = require('../schemas/schemaValidator');
const { artistSchemas } = require('../schemas')

const router = express.Router()

// Todas las rutas de esta categoría ----------------------

// GET /artists. Get all artists
router.get(`/`, async function (req, res) {
  // res.send('Hello artists!');
  const artists = await req.models.tartist.findAll({
    attributes: ['id', 'name', 'age', 'albums', 'tracks', 'self'],
  });
  // res.body = artists;
  res.send(artists);
})

router.post(
  '/',
  schemaValidator(artistSchemas.createArtist),
  function (req, res) {
    res.send('pasamos el validator')
  }
)






module.exports = router;
