const { Sequelize, Op } = require('sequelize');
const fetch = require("node-fetch");
const express = require('express');
const router = express.Router();

const db = require('../models');
const {
  TransactionValidator, RateValidator, TotalValidator
} = require('../validators');

router.get('/', async (_req, res) => {
  res.json({'status': 'OK'});
});

router.post('/transaction', async (req, res) => {
  try {

    const validate = TransactionValidator.validate(req.body);
    if (validate.error) res.status(400).send({ message: validate.error.message });
  
    const transaction = await db.Transaction.create(req.body);
  
    res.json(transaction);
  } catch (err) {
    res.status(500).send({error: err.name || 'Internal Server Error'})
  }
});

router.get('/rate', async (req, res) => {
  try {
    const validate = RateValidator.validate(req.query);
    if (validate.error) res.status(400).send({ message: validate.error.message });

    const transactions = await db.Transaction.findAll({ 
      where: {
        [Op.and]: Sequelize.where(
          Sequelize.fn('date_part', req.query.unit, Sequelize.col('date')), 
          req.query.time
        ),
        type: req.query.type
      },
      attributes: ['value', ['date', 'timestamp']], 
    });

    // TODO: Belom bener nih gapaham make api nya
    const compute = await fetch(
      'https://fhavprrg1h.execute-api.us-east-1.amazonaws.com/default/computeRate',
      { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ type: req.query.unit, values: transactions })
      }
    )

    const rate = await compute.json();
  
    res.json({...req.query, rate: `${rate.result}/${req.query.unit}`});
  }
  catch (err) {
    res.status(500).send({error: err.name || 'Internal Server Error'})
  }
});

router.get('/total', async (req, res) => {
  try {
    const validate = TotalValidator.validate(req.query);
    if (validate.error) res.status(400).send({ message: validate.error.message });

    const transactions = await db.Transaction.findAll({ 
      where: {
        date: {[Op.between]: [req.query.start_date, req.query.end_date]},
        type: req.query.type
      },
      attributes: ['value'], 
    });

    const compute = await fetch(
      'https://gjhy96vkp8.execute-api.us-east-1.amazonaws.com/default/computeTotal',
      { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ values: transactions })
      }
    );
    const total = await compute.json();

    res.json({...req.query, total: total.result });
  }
  catch (err) {
    res.status(500).send({error: err.name || 'Internal Server Error'})
  }
});

module.exports = router;