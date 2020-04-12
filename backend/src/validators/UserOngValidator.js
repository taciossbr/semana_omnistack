const {celebrate, Segments, Joi} = require('celebrate')

module.exports = {
  list: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      user_id: Joi.number().required(),
    })
  }),

}