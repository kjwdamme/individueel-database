const assert = require('assert');
const Car = require('../src/car');

describe('Reading cars out of the database', () => {
  let bmw;

  beforeEach((done) => {
    bmw = new Car({ brand: 'BMW' });
    bmw.save()
      .then(() => done());
  });

  it('finds all cars with a brand of BMW', (done) => {
    Car.find({ brand: 'BMW' })
      .then((cars) => {
        assert(cars[0]._id.toString() === bmw._id.toString());
        done();
      });
  });
});
