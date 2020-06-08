module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function servepage(req, res){
        var cart = req.app.get('cart');
        var mysql = req.app.get('mysql');
        var user = req.app.get('user');
        var orders = "INSERT INTO orders (ordertype, buyUser) VALUES (?,?)"; 
        var contains = "INSERT INTO contains (orderid, merchid, quantity) VALUES (?,?,?)";
        var payment = "INSERT INTO payment (amount, stat, orderid, buyUser) VALUES (?,?,?,?)";

    
        var inserts = ["Physical", user];
        orders = mysql.pool.query(orders,inserts,function(error, results,fields){
        if(error){
            res.end();
        }
    });
        res.render('thank')

    });
    

    return router;
}();