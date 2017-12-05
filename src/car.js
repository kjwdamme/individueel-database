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

//const Car = mongoose.model('car', CarSchema);

// const car = new Car({
//   brand: 'BMW',
//   buildYear: 2003,
//   imagePath: 'https://upload.wikimedia.org/wikipedia/commons/6/69/BMW320i_E46_Lim.jpg',
//   licensePlate: 'BB-11-BB',
//   model: '320i',
//   color: 'Black',
//   type: 'Sedan'
// }).save();

module.exports = CarSchema;
