module.exports = function(){
    var express = require('express');
    var router = express.Router();

    

    router.get('/', function serveMerch(req, res){
        //console.log("Serving Merch");
        var query = 'SELECT id, title, merchType, price FROM merch';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfMerch(error, results, fields){
          
          //take the results of that query and store ti inside context
          context.search = results;
          //pass it to handlebars to put inside a file
          res.render('search', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfMerch)

    });
    router.get('/add/:id', function(req, res){
        cart = req.app.get('cart');
        cart.push(req.query.id);
        console.log(cart);
        res.redirect('/search');
    });

    router.get('/:s', function(req, res){
      var inserts = req.query.type;
      console.log(inserts);
      if(inserts == 'None'){
        var query = 'SELECT id, title, merchType, price FROM merch';
      }
      else{
        var query = 'SELECT id, title, merchType, price FROM merch WHERE merchType = (?)';
      }
      var mysql = req.app.get('mysql');
      var context = {};

      function handleRenderingOfMerch(error, results, fields){
        context.search = results;
        //pass it to handlebars to put inside a file
        res.render('search', context)
      }
      //execute the sql query
      mysql.pool.query(query,inserts, handleRenderingOfMerch)

  });
    
    return router;
}();