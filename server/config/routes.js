var products = require('../controllers/products.js');
var path = require('path');

module.exports = function(app){
  app.get('/products', function(req, res) {
    // console.log('all product route');
    products.allProduct(req, res);
  })

  app.post('/products', function(req,res){
    products.create(req, res)
  })
  
  app.put('/products/edit/:id', function(req, res) {
    products.update(req, res);
  })
  
  app.get('/products/:id',(req,res,next)=>{products.oneProduct(req,res)})
  
  app.delete('/products/:id',(req,res,next)=>{products.destroy(req,res)})
  
	app.all("*",function(req,res){
		res.sendFile('index.html', { root: './client/dist' });
	})
}