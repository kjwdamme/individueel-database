const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  brand: String,
  buildYear: Number,
  imagePath: String,
  licensePlate: String,
  model: String,
  color: String,
  type: String
});

module.exports = CarSchema;
