const assert = require('assert');
const Advertisement = require('../src/advertisement');

describe('Reading cars out of the database', () => {
  let bmw;

  beforeEach((done) => {
    bmw = new Advertisement({ title: 'BMW' });
    bmw.save()
      .then(() => done());
  });

  it('finds all cars with a brand of BMW', (done) => {
    Advertisement.find({ title: 'BMW' })
      .then((ads) => {
        assert(ads[0]._id.toString() === bmw._id.toString());
        done();
      });
  });

  it('find a car with a particular id', (done) => {
    Advertisement.findOne({ _id: bmw._id })
      .then((ad) => {
        assert(ad.title === 'BMW');
        done();
      })
  })
});
