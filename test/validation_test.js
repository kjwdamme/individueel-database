const assert = require('assert');
const Advertisement = require('../src/advertisement');

describe('Validating records', () => {
  it('requires a title', () => {
    const ad = new Advertisement({ title: undefined });
    const validationResult = ad.validateSync();
    const { message } = validationResult.errors.title;

    assert(message === 'Title is required.');
  });

  it('requires a car\'s brand longer than 2 characters', () => {
    const ad = new Advertisement({ title: 'bb'});
    const validationResult = ad.validateSync();
    const { message } = validationResult.errors.title;

    assert(message === 'Title must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const ad = new Advertisement({ title: 'bb'});
    ad.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.title;

        assert(message === 'Title must be longer than 2 characters.');
        done();
      });
  });
});
