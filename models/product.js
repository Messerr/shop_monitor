var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title: String,
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    }
});

module.exports = mongoose.model('Product', productSchema);