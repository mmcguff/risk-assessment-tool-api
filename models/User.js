const Joi = require('joi');
const mongoose = require('mongoose');
const { riskSchema } = require('./risk');

const User = mongoose.model('Users', new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      //unique: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50
    },
    streetAddress: {
        type: String,
        required: false,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 4
    },
    zip: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5
    },
    risk: {
      type: riskSchema,
      //required: true
    }
  })
);

function validateUser(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    streetAddress: Joi.string().min(5).max(50),
    state: Joi.string().min(2).max(4).required(),
    zip: Joi.string().min(5).max(5).required(),
    //riskId: Joi.objectId(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
