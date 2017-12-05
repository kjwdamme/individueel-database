const assert = require('assert');
const Advertisement = require('../src/advertisement');

describe('Reading cars out of the database', () => {
  let bmw, audi, mercedes, volkswagen;

  beforeEach((done) => {
    bmw = new Advertisement({ title: 'BMW' });
    audi = new Advertisement({ title: 'Audi' });
    mercedes = new Advertisement({ title: 'Mercedes' });
    volkswagen = new Advertisement({ title: 'Volkswagen' });

    Promise.all([bmw.save(), audi.save(), mercedes.save(), volkswagen.save()])
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
      });
  });

  it('can skip and limit the result set', (done) => {
    Advertisement.find({})
      .sort({ title: 1 })
      .skip(1)
      .limit(2)
      .then((ads) => {
        assert(ads.length === 2);
        assert(ads[0].title === 'BMW');
        assert(ads[1].title === 'Mercedes');
        done();
      })
  });
});
