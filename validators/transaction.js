const Joi = require('joi');

module.exports = Joi.object({
  type: Joi.valid('debit', 'credit').required(),
  value: Joi.number().required(),
  date: Joi.date().required(),
}).options({ allowUnknown: false });
