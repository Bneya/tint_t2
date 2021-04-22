var express = require('express');
const artistsRouter = require('./artists');
const albumsRouter = require('./albums');
const tracksRouter = require('./tracks');

const router = express.Router();
router.use(`/artists`, artistsRouter);
router.use(`/albums`, albumsRouter);
router.use(`/tracks`, tracksRouter);

module.exports = router;
