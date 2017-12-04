const assert = require('assert');
const Car = require('../src/car');

describe('Updating records', () => {
  let bmw;

  beforeEach((done) => {
    bmw = new Car({ brand: 'BMW', numberOfPreviousOwners: 0 });
    bmw.save()
      .then(() => done());
  });

  function assertBrand(operation, done) {
    operation
    .then(() => Car.find({}))
    .then((cars) => {
      assert(cars.length === 1);
      assert(cars[0].brand === 'Audi');
      done();
    });
  }

  it('instance type using set and save', (done) => {
    bmw.set('brand', 'Audi');
    assertBrand(bmw.save(), done);

  });

  it('A model instance can update', (done) => {
    assertBrand(bmw.update({ brand: 'Audi'}), done);
  });

  it('A model class can update', (done) => {
    assertBrand(
      Car.update({ brand: 'BMW' }, { brand: 'Audi' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertBrand(
      Car.findOneAndUpdate({ brand: 'BMW' }, { brand: 'Audi' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertBrand(
    	Car.findByIdAndUpdate(bmw._id, { brand: 'Audi' }),
      done
    );
  });

  it('A car van have their numberOfPreviousOwners incremented by 1', () => {

  });
});
