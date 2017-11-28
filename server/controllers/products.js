var mongoose = require('mongoose');
var Product = mongoose.model("Product");
var User = mongoose.model("User");

module.exports = {

  register: function(req, res) {
    console.log("from controller register: ", req.body);
    var user = new User({userName: req.body.userName, email: req.body.email, password: req.body.password});
    user.save(function(err, user) {
      if (err) {
        console.log("can't create this user", err);
        // res.json({err:err});
        // response a json data in browser console area
        res.json({error:"can't create user"});
      }
      else {
        console.log(user);
        res.json(user);
      }
    })
  },

  login: function(req, res) {
    console.log("from controller login: ", req.body.email);
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) {
        console.log("can't find user email from login controller", err);
      }
      else {
        console.log("successfully login", user);
        res.json(user);
      }
    })

  },

  allProduct: function(req, res) {
    Product.find({}).sort('createdAt').exec(function(err, products) {
      if (err) {
        console.log("fail get products", err);
        res.json({err:err});
      }
      res.json(products);
    })
  },

  create: function(req, res) {
    console.log(req.body);
    console.log("back create route");
    var product = new Product({title: req.body.title, price: req.body.price, image: req.body.image_url});

    product.save(function(err) {
      if (err) {
        console.log("can't create a product", err);
        res.json({err:err});
      }
      else {
        res.json("Success");
      }
    })
  },

  oneProduct: function(req, res) {
    console.log(req.params);
    console.log("back end oneProduct");
    Product.findOne({_id: req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(data);
        res.json(data);
      }
    })
  },

  update: function(req, res) {
    console.log("update product back end");
    Product.findOne({_id:req.params.id}, function(err, data) {
      if (err) {
        console.log("can't find product");
      }
      else {
        data.title = req.body.title;
        data.price = req.body.price;
        data.image_url = req.body.image_url;
        data.save(function(err) {
          if (err) {
            console.log("can't update product");
          }
          else {
            res.redirect(303, '/products');
          }
        })
      }
    })
  },



  destroy: function(req, res) {
    console.log("back-end destroy method");
    Product.remove({_id: req.params.id}, function(err) {
      if (err) {
        console.log("Delete ERROR", err);
        res.json({err:err});
      }
      console.log("delete Success");
      res.redirect(303, '/products');
    })
  }

}
