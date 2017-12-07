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

});

// AdvertisementSchema.pre('remove', function(next) {
//   const Car = mongoose.model('car');
//
//   Car.remove({ _id: { $in: this.car } })
//     .then(() => next());
//
// });

const Advertisement = mongoose.model('advertisement', AdvertisementSchema);

// const ad = new Advertisement({
//   title: 'bmw 3 serie te koop',
//   description: 'Mooie bmw 3 serie. Met beetje werk rijdt weer helemaal 100%',
// }).save();

module.exports = Advertisement;
