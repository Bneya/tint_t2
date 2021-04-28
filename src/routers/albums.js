var express = require('express');
const schemaValidator = require('../schemas/schemaValidator');
const { albumSchemas } = require('../schemas');
const btoa = require('btoa');

const router = express.Router()

// Funciones de utilidad --------------------------------------
function createTrackObject(baseUrl, artistUrl, albumId, rawTrackObject) {
  const trackId = btoa(`${rawTrackObject.name}:${albumId}`).slice(0, 22);

  const trackObj = {
    id: trackId,
    talbum_id: albumId,
    name: rawTrackObject.name,
    duration: rawTrackObject.duration,
    times_played: 0,
    artist: artistUrl,
    album: `${baseUrl}/albums/${albumId}`,
    self: `${baseUrl}/tracks/${trackId}`,
  }

  console.log('trackObj', trackObj);
  return trackObj;
}


// Todas las rutas de esta categoría ---------------------------

// GET /albums
router.get(
  `/`,
  async function (req, res) {
    const albums = await req.models.talbum.findAll({
      attributes: ['id', ['tartist_id', 'artist_id'], 'name', 'genre', 'artist', 'tracks', 'self'],
    })

    res.setHeader('Content-Type', 'application/json');
    res.send(albums);
  }
)

// GET /albums/:id. Get all albums by id
router.get(
  `/:id`,
  async function (req, res) {

    const id = req.params.id;
    console.log('preguntando por el id:', id);
    const album = await req.models.talbum.findOne({
      attributes: ['id', ['tartist_id', 'artist_id'], 'name', 'genre', 'artist', 'tracks', 'self'],
      where: {
        id
      }
    });

    if (album) {
      res.setHeader('Content-Type', 'application/json');
      res.send(album);
    } else {
      res.status(404);
      res.send('Album no encontrado')
    }
  }
)

// GET /albums/id/tracks
router.get(
  '/:id/tracks',
  async function (req, res) {

    const id = req.params.id;
    const album = await req.models.talbum.findOne({
      attributes: [],
      where: { id },
      include: {
        model: req.models.ttrack,
        attributes: ['id', ['talbum_id', 'album_id'], 'name', 'duration', 'times_played', 'artist', 'album', 'self'],
      }
    })
    if (album) {
      res.setHeader('Content-Type', 'application/json');
      res.send(album.ttracks)
    } else {
      res.status(404);
      res.send('Album no encontrado')
    }
    // console.log('albums', albums.talbums);
  }
)

// POST /albums/:id/tracks. Crea un track para el album del id especificado
router.post(
  '/:id/tracks',
  schemaValidator(albumSchemas.createTrack),
  async function (req, res) {
    // res.send('pasamos el validador');
    const baseUrl = req.protocol + '://' + req.get('host');
    const id = req.params.id;

    const foundAlbum = await req.models.talbum.findOne({ where: { id } });

    // Si encuentras el album
    if (foundAlbum) {
      // res.send('Album encontrado');
      const artistUrl = foundAlbum.artist;
      const trackObj = createTrackObject(baseUrl, artistUrl, id, req.body);

      try {
        await req.models.ttrack.create(trackObj);

        // Creado con éxito
        res.status(201);
      } catch (validationError) {
        console.log(validationError);
        // Ya existe el track
        res.status(409);

      } finally {
        // Devuelve el track nuevo creado o el ya existente
        res.setHeader('Content-Type', 'application/json');
        const { id, talbum_id, name, duration, times_played, artist, album, self } = trackObj;
        const pristineObj = {
          id,
          album_id: talbum_id,
          name,
          duration,
          times_played,
          artist,
          album,
          self
        }
        res.send(pristineObj);
      }

    } else {
      res.status(422);
      res.send('Album no existe')
    }
  }
)


// DELETE /albums/:id. Borra un album a partir de un id
router.delete(
  '/:id',
  async function (req, res) {
     const id = req.params.id;
     const album = await req.models.talbum.findOne({ where: { id } });

     if (album) {
       // Si encuentra el album, elimínalo
       await album.destroy();
       res.status(204);
       res.send('Album eliminado');
     } else {
       // Album no encontrado
       res.status(404)
       res.send('Album no encontrado');
     }
  }
)

// PUT /albums/:id/tracks/play. Reproduce todas las canciones de un album
router.put(
  '/:id/tracks/play',
  async function (req, res) {

    const id = req.params.id;
    const album = await req.models.talbum.findOne({ where: { id } });

    if (album) {
      // Si encuentra el album, reproduce sus canciones
      await req.models.ttrack.update(
        { times_played: req.models.sequelize.literal('times_played + 1') },
        { where: { talbum_id: id } }
      );

      res.status(200);
      res.send('Canciones del album reproducidas')

    } else {
      // Album no encontrado
      res.status(404);
      res.send('Album no encontrado')
    }
  }
)



module.exports = router;
