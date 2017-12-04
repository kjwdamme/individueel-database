const mongoose = require('mongoose');
const CarSchema = require('./car');
const Schema = mongoose.Schema;

const AdvertisementSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (title) => title.length > 2,
      message: 'Title must be longer than 2 characters.'
    },
    required: [true, 'Title is required.']
  },
  car: CarSchema
});
const Advertisement = mongoose.model('advertisement', AdvertisementSchema);

module.exports = Advertisement;
