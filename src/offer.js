const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  amount: Number,
  name: String
});

module.exports = OfferSchema;
