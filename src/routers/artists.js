var express = require('express');
const schemaValidator = require('../schemas/schemaValidator');
const { artistSchemas } = require('../schemas')

const router = express.Router()

// Todas las rutas de esta categoría ----------------------

// GET /artists. Get all artists
router.get(
  `/`,
  async function (req, res) {

    const artists = await req.models.tartist.findAll({
      attributes: ['id', 'name', 'age', 'albums', 'tracks', 'self'],
    });
    // res.body = artists;
    res.send(artists);
  }
)

// GET /artists/:id. Get all artist by id
router.get(`/:id`, async function (req, res) {

  // console.log('req', req);
  const id = req.params.id;
  console.log('preguntando por el id:', id);
  const artists = await req.models.tartist.findAll({
    attributes: ['id', 'name', 'age', 'albums', 'tracks', 'self'],
    where: {
      id
    }
  });
  if (artists.length > 0) {
    res.send(artists);
  } else {
    res.status(404);
    res.send('Artista no encontrado')
  }
})

router.post(
  '/',
  schemaValidator(artistSchemas.createArtist),
  function (req, res) {
    res.send('pasamos el validator')
  }
)






module.exports = router;
