var express = require('express');
const schemaValidator = require('../schemas/schemaValidator');
const { artistSchemas } = require('../schemas');
const btoa = require('btoa');

const router = express.Router()

// Funciones de utilidad --------------------------------------
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

function createAlbumObject(baseUrl, artistId, rawAlbumObject) {
  const albumId = btoa(`${rawAlbumObject.name}:${artistId}`).slice(0, 22);

  const albumObj = {
    id: albumId,
    tartist_id: artistId,
    name: rawAlbumObject.name,
    genre: rawAlbumObject.genre,
    artist: `${baseUrl}/artists/${artistId}`,
    tracks: `${baseUrl}/albums/${albumId}/tracks`,
    self: `${baseUrl}/albums/${albumId}`,
  }

  console.log('albumObj', albumObj);
  return albumObj;

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

// GET /artists/:id. Get artist by id
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

// POST /artists. Crear un artista
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
      console.log(validationError);
      // Ya eiste el artista
      res.status(409);
    } finally {

      // Devuelve el artista nuevo creado o el ya existente
      res.setHeader('Content-Type', 'application/json');
      res.send(artistObj);
    }

  }
)

// POST /artists/id/albums. Crea un album de un artista
router.post(
  '/:id/albums',
  schemaValidator(artistSchemas.createAlbum),
  async function (req, res) {

    const baseUrl = req.protocol + '://' + req.get('host');
    const tartist_id = req.params.id;
    const albumObj = createAlbumObject(baseUrl, tartist_id, req.body);

    const foundArtist = await req.models.tartist.findOne({ where: { id: tartist_id } });
    console.log('foundArtist', foundArtist);

    // Si encuentras al artista
    if (foundArtist){
      // Intenta crearlo ahora
      try {

        await req.models.talbum.create(albumObj);

        // Creado con éxito
        res.status(201);
      } catch (validationError) {
        console.log(validationError);
        // Ya existe el album
        res.status(409);
      } finally {

        // Devuelve el album nuevo creado o el ya existente
        res.setHeader('Content-Type', 'application/json');
        const { id, tartist_id, name, genre, artist, tracks, self } = albumObj;
        const pristineObj = {
          id,
          artist_id: tartist_id,
          name,
          genre,
          artist,
          tracks,
          self
        }
        res.send(pristineObj);
      }
    } else {      // Si no lo encuentras, devuelve el 422
      res.status(422);
      res.send('Artista no existe')
    }

  }
)

// DELETE /artists/:id. Borra un artista a partir de un id
router.delete(
  '/:id',
  async function (req, res) {
     const id = req.params.id;
     const artist = await req.models.tartist.findOne({ where: { id } });

     if (artist) {
       // Si encuentra el artista, elimínalo
       await artist.destroy();
       res.status(204);
       res.send('Artista eliminado');
     } else {
       // Artista no encontrado
       res.status(404)
       res.send('Artista inexistente');
     }
  }
)

// PUT /artists/:id/albums/play
router.put(
  '/:id/albums/play',
  async function (req, res) {

    const id = req.params.id;
    const artist = await req.models.tartist.findOne({ where: { id } });

    if (artist) {

      // Obtén todos los id de albums de un artista
      const artistAlbums = await req.models.talbum.findAll({
        attributes: ['id'],
        where: { tartist_id: id },
        raw: true,
      })
      const albumIds = artistAlbums.map(alb => alb.id);
      console.log('artistAlbums', artistAlbums);
      console.log('albumIds', albumIds);

      // Incrementa en +1 todos los tracks que tengan talbum_id alguno de los anteriores
      await req.models.ttrack.update(
        { times_played: req.models.sequelize.literal('times_played + 1') },
        { where: { talbum_id: albumIds } }
      )

      res.status(200);
      res.send('Todas las canciones del artista fueron reproducidas');

    } else {
      // Artista no encontrado
      res.status(404);
      res.send('Artista no encontrado');
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
