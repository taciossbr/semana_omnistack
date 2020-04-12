const {celebrate, Segments, Joi} = require('celebrate')

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    })
  })
}