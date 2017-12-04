const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  brand: String
});

module.exports = CarSchema;
