const assert = require('assert');
const Car = require('../src/car');

describe('Validating records', () => {
  it('requires a brand', () => {
    const car = new Car({ brand: undefined });
    const validationResult = car.validateSync();
    const { message } = validationResult.errors.brand;

    assert(message === 'Brand is required.');
  });

  it('requires a car\'s brand longer than 2 characters', () => {
    const car = new Car({ brand: 'bb'});
    const validationResult = car.validateSync();
    const { message } = validationResult.errors.brand;

    assert(message === 'Brand must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const car = new Car({ brand: 'bb'});
    car.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.brand;

        assert(message === 'Brand must be longer than 2 characters.');
        done();
      });
  });
});
