var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new mongoose.Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  image_url: {type: String, require: true},
  _user: [{type: Schema.Types.ObjectId, ref:"User"}]
}, {timestamps: true});

var Product = mongoose.model('Product', ProductSchema);


var UserSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, require: true},
  _products: [{type: Schema.Types.ObjectId, ref:"Product"}]
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);
