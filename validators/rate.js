const Joi = require('joi');

module.exports = Joi.object({
  unit: Joi.valid('hour', 'day', 'week', 'month', 'year').required(),
  type: Joi.valid('debit', 'credit').required(),
  time: Joi.string().required(),
}).options({ allowUnknown: false });
