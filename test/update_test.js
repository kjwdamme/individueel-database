const assert = require('assert');
const Advertisement = require('../src/advertisement');

describe('Updating records', () => {
  let bmw;

  beforeEach((done) => {
    bmw = new Advertisement({ title: 'BMW' });
    bmw.save()
      .then(() => done());
  });

  function assertBrand(operation, done) {
    operation
    .then(() => Advertisement.find({}))
    .then((ads) => {
      assert(ads.length === 1);
      assert(ads[0].title === 'Audi');
      done();
    });
  }

  it('instance type using set and save', (done) => {
    bmw.set('title', 'Audi');
    assertBrand(bmw.save(), done);

  });

  it('A model instance can update', (done) => {
    assertBrand(bmw.update({ title: 'Audi'}), done);
  });

  it('A model class can update', (done) => {
    assertBrand(
      Advertisement.update({ title: 'BMW' }, { title: 'Audi' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertBrand(
      Advertisement.findOneAndUpdate({ title: 'BMW' }, { title: 'Audi' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertBrand(
    	Advertisement.findByIdAndUpdate(bmw._id, { title: 'Audi' }),
      done
    );
  });

  // it('A car van have their numberOfPreviousOwners incremented by 1', () => {
  //
  // });
});
