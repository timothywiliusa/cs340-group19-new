module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function servepage(req, res){
        var cart = req.app.get('cart');
        var query = 'SELECT id, title, merchType, price FROM merch WHERE id IN (?)'
        var mysql = req.app.get('mysql');
        var context = {};
        var inserts = [cart];

        function handleNew(error, results, fields){
            console.log(results);
            context.search = results;
            res.render('checkout', context);
        }

            mysql.pool.query(query,inserts, handleNew);
    });
    router.get('/remove/:id', function(req,res){
        var cart = req.app.get('cart');

        const index = cart.indexOf(req.query.id);
        if (index > -1) {
        cart.splice(index, 1);
        }
        res.redirect('/checkout');
        });
    return router;
}();