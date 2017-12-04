const assert = require('assert');
const Advertisement = require('../src/advertisement');

describe('Creating records', () => {
    it('saves a advertisement', (done) => {
      const bmw = new Advertisement({ title: 'BMW' })

      bmw.save()
        .then(() => {
          assert(!bmw.isNew);
          done();
        });
    });
});
