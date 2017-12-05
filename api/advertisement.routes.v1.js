//
// ./api/v1/recipe.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Advertisement = require('../src/advertisement');

//
// Geef een lijst van alle users.
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
// Retourneer één specifieke users. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/users/23
//
// routes.get('/recipes/:id', function (req, res) {
//     res.contentType('application/json');
//
//     var recipeId = req.params.id;
//
//     Recipe.findOne({ _id: recipeId})
//         .then(function (recipe) {
//             res.status(200).json(recipe);
//         }).catch((error) => {
//             res.status(400).json(error);
//         })
// });

//
// Voeg een user toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/users
//
// routes.post('/recipes', function (req, res) {
//     res.contentType('application/json');
//
//     var body = req.body;
//     body.status = false;
//
//     Recipe.create(body, function(err, recipe) {
//         if (err) {
//             res.status(400).json(error);
//         } else {
//             res.status(200).json(recipe);
//         }
//     })
// });

//
// Wijzig een bestaande user. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: PUT http://hostname:3000/api/v1/users/23
//
// routes.put('/recipes/:id', function (req, res) {
//     var recipeId = req.params.id;
//     Recipe.findOneAndUpdate({
//         _id: recipeId
//     }, {$set: {
//         name: req.body.name,
//         description: req.body.description,
//         imagePath: req.body.imagePath,
//         ingredients: req.body.ingredients
//     }}).then(function (recipe) {
//         res.status(200). json(recipe);
//     }).catch((error) => {
//         res.status(400).json(error);
//     })
// });

//
// Verwijder een bestaande user.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: DELETE http://hostname:3000/api/v1/users/23
//
// routes.delete('/recipes/:id', function (req, res) {
//     var recipeId = req.params.id;
//
//     Recipe.findOneAndRemove({ _id: recipeId})
//         .then(function (recipe) {
//             res.status(200).json({"response": "Successfully deleted"});
//         }).catch((error) => {
//         res.status(400).json(error);
//     })
// });

module.exports = routes;
