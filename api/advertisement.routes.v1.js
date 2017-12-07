var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Advertisement = require('../src/advertisement');

//
// Return a list with all advertisements
//

routes.get('/advertisements', function (req, res) {
    res.contentType('application/json');

    Advertisement.find({})
      .then(function (ads) {
        res.status(200).json(ads);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
});

//
// Return a advertisement from an id
//

routes.get('/advertisements/:id', function(req, res) {
  res.contentType('application/json');

  var id = req.params.id;

  Advertisement.findOne({_id: id})
    .then(function (ad) {
      res.status(200).json(ad);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//
// Return a list with advertisements of cars from a specific brand
//

routes.get('/advertisements/car/:brand', function(req, res) {
  res.contentType('application/json');

  var brandFromUrl = req.params.brand;

  Advertisement.find({'car.brand': brandFromUrl})
    .then(function (ads) {
      res.status(200).json(ads);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//
// Return a list with filter options givin in the body
//

// routes.get('/advertisements/:brand/:buildyear/:model/:type', function(req, res) {
//   var brand = req.params.brand;
//   var buildYear = req.params.buildyear;
//   var model = req.params.model;
//   //var color = req.params.color;
//   var type = req.params.type;
//
//   Advertisement.find({
//     'car.brand': brand,
//     'car.buildYear': buildYear,
//     'car.model': model,
//     //'car.color': color,
//     'car.type': type
//   })
//   .then(function (ads) {
//     res.status(200).json(ads);
//   })
//   .catch((error) => {
//     res.status(400).json(error);
//   });
// });

//
// Add an advertisement.
//

routes.post('/advertisements', function (req, res) {
    res.contentType('application/json');

    var body = req.body;

    Advertisement.create(body, function(err, ad) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(ad);
        }
    });
});

//
// Update an existing advertisement
//

routes.put('/advertisements/:id', function (req, res) {
    var adId = req.params.id;
    var body = req.body;
    Advertisement.findOneAndUpdate({
        _id: adId
    }, {$set: {
        title: body.title,
        description: body.description,
        car: {
          brand: body.car.brand,
          buildYear: body.car.buildYear,
          imagePath: body.car.imagePath,
          licensePlate: body.car.licensePlate,
          model: body.car.model,
          type: body.car.type
        },
        offers: body.offers
    }}).then(function (ad) {
        res.status(200). json(ad);
    }).catch((error) => {
        res.status(400).json(error);
    })
});

//
// Add an offer to an advertisement
//

routes.put('/advertisements/:id/offer', function (req, res) {
    var adId = req.params.id;
    var body = req.body;
    Advertisement.findOneAndUpdate({
        _id: adId
    }, {$push: {offers: body}}).then(function (ad) {
        res.status(200). json(ad);
    }).catch((error) => {
        res.status(400).json(error);
    })
});

//
// Delete an advertisement
//

routes.delete('/advertisements/:id', function (req, res) {
    var advertId = req.params.id;

    Advertisement.findOneAndRemove({ _id: advertId})
        .then(function (recipe) {
            res.status(200).json({"response": "Successfully deleted"});
        }).catch((error) => {
        res.status(400).json(error);
    })
});

module.exports = routes;
