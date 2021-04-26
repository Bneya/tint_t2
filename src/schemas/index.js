const Joi = require('joi');


// Artist schemas ------------------------------------
const createArtist = Joi.object().keys({
  body: Joi.object().keys({
    name: Joi.string()
      .required(),
    age: Joi.number()
      .integer()
      .required(),
  })
})

const createAlbum = Joi.object().keys({
  body: Joi.object().keys({
    name: Joi.string()
      .required(),
    genre: Joi.string()
      .required()
  })
})



// Route METHODS schema
const routeMethods = {
  '/artists': ['GET', 'POST'],
  '/artists/id': ['GET'],
}


const artistSchemas = {
  createArtist,
  createAlbum
}


module.exports = { artistSchemas }
