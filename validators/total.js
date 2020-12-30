const Joi = require('joi');

module.exports = Joi.object({
  type: Joi.valid('debit', 'credit').required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().min(Joi.ref('start_date')).required(),
}).options({ allowUnknown: false });
