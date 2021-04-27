var express = require('express');

const router = express.Router()

// Todas las rutas de esta categoría -----------------------


// GET /tracks
router.get(
  `/`,
  async function (req, res) {
    const tracks = await req.models.ttrack.findAll({
      attributes: ['id', ['talbum_id', 'album_id'], 'name', 'duration', 'times_played', 'artist', 'album', 'self'],
    })

    res.setHeader('Content-Type', 'application/json');
    res.send(tracks);
  }
)

// GET /tracks/:id. Get track by id
router.get(
  `/:id`,
  async function (req, res) {

    const id = req.params.id;
    console.log('preguntando por el id:', id);
    const track = await req.models.ttrack.findOne({
      attributes: ['id', ['talbum_id', 'album_id'], 'name', 'duration', 'times_played', 'artist', 'album', 'self'],
      where: {
        id
      }
    });

    if (track) {
      res.setHeader('Content-Type', 'application/json');
      res.send(track);
    } else {
      res.status(404);
      res.send('Canción no encontrada')
    }
  }
)

// DELETE /tracks/:id. Borra un track a partir de un id
router.delete(
  '/:id',
  async function (req, res) {
     const id = req.params.id;
     const track = await req.models.ttrack.findOne({ where: { id } });

     if (track) {
       // Si encuentra el artista, elimínalo
       await track.destroy();
       res.status(204);
       res.send('Canción eliminada');
     } else {
       // Artista no encontrado
       res.status(404)
       res.send('Canción inexistente');
     }
  }
)




module.exports = router;
