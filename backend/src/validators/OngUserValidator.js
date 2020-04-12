const {celebrate, Segments, Joi} = require('celebrate')

module.exports = {
  list: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      ong_id: Joi.string().required(),
    })
  }),

  create: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      ong_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string().required(),
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      ong_id: Joi.string().required(),
      user_id: Joi.string().required(),
    })
  })
}