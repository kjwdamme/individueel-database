const assert = require('assert');
const Car = require('../src/car');

describe('Deleting a car', () => {
  let bmw;

  beforeEach((done) => {
    bmw = new Car({ brand: 'BMW' });
    bmw.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    bmw.remove()
      .then(() => Car.findOne({ brand: 'BMW'}))
      .then((car) => {
        assert(car === null);
        done();
      });
  });

  it('class method remove', (done) => {
    Car.remove({ brand: 'BMW'})
      .then(() => Car.findOne({ brand: 'BMW'}))
      .then((car) => {
        assert(car === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    Car.findOneAndRemove({ brand: 'BMW' })
      .then(() => Car.findOne({ brand: 'BMW'}))
      .then((car) => {
        assert(car === null);
        done();
    });
  })

  it('class method findByIdAndRemove', (done) => {
    Car.findByIdAndRemove(bmw._id)
      .then(() => Car.findOne({ brand: 'BMW'}))
      .then((car) => {
        assert(car === null);
        done();
    });
  });
})
