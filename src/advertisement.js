const mongoose = require('mongoose');
const CarSchema = require('./car');
const OfferSchema = require('./offer');
const Schema = mongoose.Schema;
const Car = require('../src/car');

const AdvertisementSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (title) => title.length > 2,
      message: 'Title must be longer than 2 characters.'
    },
    required: [true, 'Title is required.']
  },
  description: String,
  car: CarSchema,
  offers: [OfferSchema]

}, { strict: true });
const Advertisement = mongoose.model('advertisement', AdvertisementSchema);

module.exports = Advertisement;
