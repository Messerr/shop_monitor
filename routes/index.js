var express = require('express');
var router = express.Router();
const Store = require('../models/store');
const Product = require('../models/product');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('stores').find().toArray(function(err, results) {
    res.render('index', {storelist: results});
  });
});

router.get('/store/:id', function(req, res, next) {
  Store.findById({_id: mongoose.Types.ObjectId(req.params.id)}, function (err, store) {
    if (err) return next(err);
    res.render('storesingle', {store: store});
    console.log(store);
  });
});

router.post('/addstore', function(req, res){
  var store = new Store(req.body);
  store.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
});

router.get('/deletestore/:id', function(req, res) {
  Store.findByIdAndRemove({_id: mongoose.Types.ObjectId(req.params.id)}, function(err) {
        if (!err) {
            res.redirect('/');
        } else {
            return console.log('Error deleting store!');
        }
    });
});
module.exports = router;
