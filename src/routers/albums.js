var express = require('express');

const router = express.Router()

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

// DELETE /albums/:id. Borra un album a partir de un id
router.delete(
  '/:id',
  async function (req, res) {
     const id = req.params.id;
     const album = await req.models.talbum.findOne({ where: { id } });

     if (album) {
       // Si encuentra el artista, elimínalo
       await album.destroy();
       res.status(204);
       res.send('Album eliminado');
     } else {
       // Artista no encontrado
       res.status(404)
       res.send('Album no encontrado');
     }
  }
)



module.exports = router;
