const {celebrate, Segments, Joi} = require('celebrate')

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(16)
    })
  })
}