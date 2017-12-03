const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/cars_test', {
      useMongoClient: true
  });
  mongoose.connection
      .once('open', () => { done(); })
      .on('error', (error) => {
          console.warn('Warning', error);
  });
});


beforeEach((done) => {
  mongoose.connection.collections.cars.drop(() => {
      done();
  });
});
