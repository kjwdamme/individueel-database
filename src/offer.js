const mongoose = require('mongoose'), validator = require('node-mongoose-validator');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  amount: {
    type: Number,
    validate: {
      validator: (amount) => amount != 0,
      message: 'Can\'t offer an amount of 0'
    },
    required: [true, 'Amount is required']
  },
  name: String
},  { strict: true });

module.exports = OfferSchema;
