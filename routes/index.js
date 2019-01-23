var express = require('express');
var router = express.Router();
const Store = require('../models/store');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('storelist').find().toArray(function(err, results) {
    res.render('index', {storelist: results});
  });
});

router.get('/store/:id', function(req, res, next) {
  Store.findById({_id: new mongoose.Types.ObjectId(req.params._id)}, function (err, store) {
    if (err) return next(err);
    res.render('storesingle', {store: store});
    console.log(store);
  });
});

router.post('/addstore', function(req, res){
  var collection = db.collection('storelist');
  var store = new Store(req.body);
  collection.insert(store, function(err, result) {
    res.send(
      (err === null) ? res.redirect('/') : { msg: err }
    );
  });
});

router.delete('/deletestore/:id', function(req, res) {
  Store.remove({_id: req.params._id}, req.body, function(err, result) {
    res.send(
      (err === null) ? res.redirect('/') : { msg: err }
    );
  });
});
module.exports = router;
