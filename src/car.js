const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: String
});

const Car = mongoose.model('car', CarSchema);

module.exports = Car;