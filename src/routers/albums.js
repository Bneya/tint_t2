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






module.exports = router;
