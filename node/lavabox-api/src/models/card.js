const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const cardSchema = new Schema({
  token: String,
  email: String,
  createdAt: Number,
  fourDigits: Number,
  cardBrand: String,
  dbCreatedAt: Number,
  title: String,
  active: Boolean
});

// Create a model
const Card = mongoose.model('card', cardSchema);

// Export the model
module.exports = Card;
