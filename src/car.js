const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: String,
    numberOfPreviousOwners: Number
});

const Car = mongoose.model('car', CarSchema);

module.exports = Car;
