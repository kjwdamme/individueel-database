const mongoose = require('mongoose'), validator = require('node-mongoose-validator');
const Schema = mongoose.Schema;

var typeList = ['Sedan', 'Station', 'SUV', 'Hatchback'];
var brandList = ['BMW', 'Mercedes-Benz', 'Volvo', 'Volkswagen', 'Toyota', 'Renault', 'Opel', 'Peugeot', 'Seat', 'Fiat', 'Audi', 'Ford'];
var colorList = ['black', 'white', 'brown', 'red', 'grey', 'gray', 'orange', 'green', 'yellow', 'pink']

const CarSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required.']
  },
  buildYear: {
    type: Date,
    required: [true, 'Buildyear is required']
  },
  imagePath: {
    type: String,
    required: [true, 'Image path is required.']
  },
  licensePlate: {
    type: String,
    validate: {
      validator: (licensePlate) => licensePlate.length === 8,
      message: 'That is not a valid license plate'
    },
    required: [true, 'License plate is required.']
  },
  model: String,
  color: {
    type: String,
    required: [true, 'Color is required']
  },
  type: {
    type: String,
    required: [true, 'Type is required.']
  }
}, { strict: true });

//Validations
CarSchema.path('type').validate(validator.isIn(typeList), 'That is not a valid type');
CarSchema.path('imagePath').validate(validator.isURL(), 'Imagepath must be an URL');
CarSchema.path('brand').validate(validator.isIn(brandList), 'That is not a valid brand');
CarSchema.path('licensePlate').validate(validator.contains('-'), 'That is not a valid license plate');
CarSchema.path('color').validate(validator.isIn(colorList), 'That is not a valid color');

module.exports = CarSchema;
