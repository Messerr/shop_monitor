var mongoose = require('mongoose');

var storeSchema = new mongoose.Schema({
    url: String
});

module.exports = mongoose.model('Store', storeSchema);