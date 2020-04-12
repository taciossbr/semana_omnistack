const {celebrate, Segments, Joi} = require('celebrate')

module.exports = {
  list: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    })
  }),

  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.string().required(),
      ong_id: Joi.string().required(),
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  })
}