const Joi = require('joi');
const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
  houseFire: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  wildFire: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  heatWave: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  drought: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  flood: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  hurricane: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  tornado: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  winterStorm: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  earthQuake: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  }
});

const Risk = mongoose.model('Risk', riskSchema);

function validateRisk(risk) {
  const schema = {
    houseFire: Joi.number().min(1).max(100).required(),
    wildFire: Joi.number().min(1).max(100).required(),
    heatWave: Joi.number().min(1).max(100).required(),
    drought: Joi.number().min(1).max(100).required(),
    flood: Joi.number().min(1).max(100).required(),
    hurricane: Joi.number().min(1).max(100).required(),
    tornado: Joi.number().min(1).max(100).required(),
    winterStorm: Joi.number().min(1).max(100).required(),
    earthQuake: Joi.number().min(1).max(100).required()
  };

  return Joi.validate(risk, schema);
}

exports.riskSchema = riskSchema;
exports.Risk = Risk; 
exports.validate = validateRisk;