var express = require('express');
var router = express.Router();
const Store = require('../models/store');


/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('storelist').find().toArray(function(err, results) {
    res.render('index', {storelist: results});
  });
});

router.get('/store/:id', function(req, res, next) {
  const collection = db.collection('storelist');
  collection.findById({_id: req.params._id}, function (err, store) {
    if (err) return next(err);
    res.render('storesingle', {store: store});
    console.log(store);
  });
});

router.post('/addstore', function(req, res){
  var collection = db.collection('storelist');
  var newStore = new Store(req.body);
  collection.insert(newStore, function(err, result) {
    res.send(
      (err === null) ? res.redirect('/') : { msg: err }
    );
  });
});

module.exports = router;
