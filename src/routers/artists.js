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
router.get(
  `/:id`,
  async function (req, res) {

    // console.log('req', req);
    const id = req.params.id;
    console.log('preguntando por el id:', id);
    const artist = await req.models.tartist.findOne({
      attributes: ['id', 'name', 'age', 'albums', 'tracks', 'self'],
      where: {
        id
      }
    });
    // console.log('artist', artist);
    if (artist) {
      res.send(artist);
    } else {
      res.status(404);
      res.send('Artista no encontrado')
    }
  }
)

// GET /artists/:id/albums
router.get(
  '/:id/albums',
  async function (req, res) {
    // const albums = await.req.models.tartist.findAll
  }
)



router.post(
  '/',
  schemaValidator(artistSchemas.createArtist),
  function (req, res) {
    res.send('pasamos el validator')
  }
)






module.exports = router;
