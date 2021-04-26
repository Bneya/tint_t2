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






module.exports = router;
