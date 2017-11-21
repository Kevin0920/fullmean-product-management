var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  image_url: {type: String}
}, {timestamps: true})

mongoose.model('Product', ProductSchema);

