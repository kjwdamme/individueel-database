const assert = require('assert');
const Car = require('../src/car');

describe('Creating records', () => {
    it('saves a car', (done) => {
      const bmw = new Car({ brand: 'BMW' })

      bmw.save()
        .then(() => {
          assert(!bmw.isNew);
          done();
        });
    });
});
