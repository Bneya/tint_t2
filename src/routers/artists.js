var express = require('express');
const schemaValidator = require('../schemas/schemaValidator');
const { artistSchemas } = require('../schemas')
const btoa = require('btoa');

const router = express.Router()

// Funciones de utilidad
function createArtistObject(fullUrl, rawArtistObject) {
  const artistId = btoa(rawArtistObject.name).slice(0, 22);

  const artistObj = {
    id: artistId,
    name: rawArtistObject.name,
    age: rawArtistObject.age,
    albums: `${fullUrl}/${artistId}/albums`,
    tracks: `${fullUrl}/${artistId}/tracks`,
    self: `${fullUrl}/${artistId}`,
  }

  return artistObj;

}


// Todas las rutas de esta categoría ----------------------

// GET /artists. Get all artists
router.get(
  `/`,
  async function (req, res) {

    const artists = await req.models.tartist.findAll({
      attributes: ['id', 'name', 'age', 'albums', 'tracks', 'self'],
    });
    // res.body = artists;
    res.setHeader('Content-Type', 'application/json');
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
      res.setHeader('Content-Type', 'application/json');
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

    const id = req.params.id;
    const artist = await req.models.tartist.findOne({
      attributes: [],
      where: { id },
      include: {
        model: req.models.talbum,
        attributes: ['id', ['tartist_id', 'artist_id'], 'name', 'genre', 'artist', 'tracks', 'self'],
      }
    })
    if (artist) {
      res.setHeader('Content-Type', 'application/json');
      res.send(artist.talbums)
    } else {
      res.status(404);
      res.send('Artista no encontrado')
    }
    // console.log('albums', albums.talbums);
  }
)

// GET /artists/:id/tacks
router.get(
  '/:id/tracks',
  async function (req, res) {

    const id = req.params.id;
    const artist = await req.models.tartist.findOne({
      attributes: [],
      where: { id },
      include: {
        model: req.models.talbum,
        attributes: ['id', ['tartist_id', 'artist_id'], 'name', 'genre', 'artist', 'tracks', 'self'],
        include: {
          model: req.models.ttrack,
          attributes: ['id', ['talbum_id', 'album_id'], 'name', 'duration', 'times_played', 'artist', 'album', 'self'],
        }
      }
    })
    if (artist) {
      // Si encontró al artista, junta todos sus tracks y entrégalos
      const ttracks = [];
      artist.talbums.forEach((talbum) => {
        ttracks.push.apply(ttracks, talbum.ttracks);
      });

      res.setHeader('Content-Type', 'application/json');

      res.send(ttracks)
    } else {
      res.status(404);
      res.send('Artista no encontrado')
    }
    // console.log('albums', albums.talbums);
  }
)

// POST /artists
router.post(
  '/',
  schemaValidator(artistSchemas.createArtist),
  async function (req, res) {
    // console.log('res body', req.body);

    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const artistObj = createArtistObject(fullUrl, req.body);
    // console.log('artistObj', artistObj);

    try {
      await req.models.tartist.create(artistObj);

      // Creado con éxito
      res.status(201);
    } catch (validationError) {

      // Ya eiste el artista
      res.status(409);
    } finally {

      // Devuelve el artista nuevo creado o el ya existente
      res.setHeader('Content-Type', 'application/json');
      res.send(artistObj);
    }

  }
)



// router.post(
//   '/',
//   schemaValidator(artistSchemas.createArtist),
//   function (req, res) {
//     res.send('pasamos el validator')
//   }
// )






module.exports = router;
