const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: {
      type: String,
      validate: {
        validator: (brand) => brand.length > 2,
        message: 'Brand must be longer than 2 characters.'
      },
      required: [true, 'Brand is required.']
    },
    numberOfPreviousOwners: Number
});



const Car = mongoose.model('car', CarSchema);

module.exports = Car;
