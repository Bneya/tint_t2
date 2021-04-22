const Joi = require('joi');

const createArtist = Joi.object().keys({
  body: Joi.object().keys({
    name: Joi.string()
      .required(),
    age: Joi.number()
      .integer()
      .required(),
  })
})




const artistSchemas = {
  createArtist
}


module.exports = { artistSchemas }
