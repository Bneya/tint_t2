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

const createTrack = Joi.object().keys({
  body: Joi.object().keys({
    name: Joi.string()
      .required(),
    duration: Joi.number()
      .required(),
  })
})



const artistSchemas = {
  createArtist,
  createAlbum
}

const albumSchemas = {
  createTrack,
}


module.exports = { artistSchemas, albumSchemas }
