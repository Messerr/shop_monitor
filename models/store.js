var mongoose = require('mongoose');

var storeSchema = new mongoose.Schema({
    _id: String,
    url: String
});

module.exports = mongoose.model('Store', storeSchema);