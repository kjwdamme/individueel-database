const assert = require('assert');
const Advertisement = require('../src/advertisement');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const bmwAd = new Advertisement({
      title: 'BMWAd',
      car: {
        brand: 'BMW'
      }
    });

    bmwAd.save()
      .then(() => Advertisement.findOne({ title: 'BMWAd'}))
      .then((ad) => {
        assert(ad.car.brand === 'BMW');
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    const bmwAd = new Advertisement({
      title: 'BMWAd',
      car: {}
    });

    bmwAd.save()
      .then(() => Advertisement.findOne({ title: 'BMWAd' }))
      .then((ad) => {
        ad.car.set({ brand: 'BMW'});
        return ad.save();
      })
      .then(() => Advertisement.findOne({ title: 'BMWAd'}))
      .then((ad) => {
        assert(ad.car.brand === 'BMW');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const bmwAd = new Advertisement({
      title: 'BMW Ad',
      car: { brand: 'BMW'}
    });

    bmwAd.save()
      .then(() => Advertisement.findOne({title: 'BMW Ad'}))
      .then((ad) => {
        ad.car.remove();
        return ad.save();
      })
      .then(() => Advertisement.findOne({ title: 'BMW Ad'}))
      .then((ad) => {
        assert(ad.car === null);
        done();
      });
  });
});
