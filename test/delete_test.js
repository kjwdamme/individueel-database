const assert = require('assert');
const Advertisement = require('../src/advertisement');

describe('Deleting an ad', () => {
  let bmw;

  beforeEach((done) => {
    bmw = new Advertisement({ title: 'BMW' });
    bmw.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    bmw.remove()
      .then(() => Advertisement.findOne({ title: 'BMW'}))
      .then((ad) => {
        assert(ad === null);
        done();
      });
  });

  it('class method remove', (done) => {
    Advertisement.remove({ title: 'BMW'})
      .then(() => Advertisement.findOne({ title: 'BMW'}))
      .then((ad) => {
        assert(ad === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    Advertisement.findOneAndRemove({ title: 'BMW' })
      .then(() => Advertisement.findOne({ title: 'BMW'}))
      .then((car) => {
        assert(car === null);
        done();
    });
  })

  it('class method findByIdAndRemove', (done) => {
    Advertisement.findByIdAndRemove(bmw._id)
      .then(() => Advertisement.findOne({ title: 'BMW'}))
      .then((ad) => {
        assert(ad === null);
        done();
    });
  });
})
