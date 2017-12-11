var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Advertisement = require('../src/advertisement');
const mongoose = require('mongoose');

var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"));
var session = driver.session();

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

//
// Add advertisement id to neo4j database
//

routes.post('/favorites/:id', function (req, res) {
  var id = req.params.id;

  session
    .run("CREATE(n:Advertisement {idFromMongo:{idParam}}) RETURN n.idFromMongo", {idParam: id})
    .then(function(result) {
      res.status(200).json({"response": "Successfully added to your favorites"});
      session.close();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//
// Get all favorites
//

routes.get('/favorites', function(req, res) {
  //res.contentType('application/json');
  var ids = [];
  var advertisementsFromFavs = [];

  session
    .run("MATCH (n:Advertisement) RETURN n")
    .then(function(result) {
      result.records.forEach(function(record){
        ids.push(record._fields[0].properties.idFromMongo);
      });
      //res.status(200).json(ids);
      Advertisement.find({
        '_id': { $in: ids}
      }, function(err, docs){
        res.status(200).json(docs);
      })

    })
    .catch((error) => {
      res.status(400).json(error);
    })
});


module.exports = routes;
