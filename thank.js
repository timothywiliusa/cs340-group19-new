module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function servepage(req, res){
        var cart = req.app.get('cart');
        var mysql = req.app.get('mysql');
        var user = req.app.get('user');
        var context = {};
        var id;
        var complete = 0;
        var orders = "INSERT INTO orders (ordertype, buyUser) VALUES (?,?)";
        var newest = "SELECT id FROM orders ORDER BY id DESC LIMIT 0, 1" 
        var contains = "INSERT INTO contains (orderid, merchid, quantity) VALUES (?,?,?)";
        var payment = "INSERT INTO payment (amount, orderid, buyUser) VALUES (?,?,?)";

    console.log("HERE");
    function callNewest(error, results,fields){
        if(error){
            console.log(error);
            res.end();
        }
        console.log(results);
        id = results[0].id;
        console.log("ID: ", id);

        inserts = [99.89,id,user]
        payment = mysql.pool.query(payment,inserts,callPayment);

        context.search = results;
        res.render('thank', context);
        };


        var inserts = ["Physical", user];
        orders = mysql.pool.query(orders,inserts,function(error, results,fields){
        if(error){
            res.end();
        }

        newest = mysql.pool.query(newest,inserts,callNewest);

        });
        
        function callContains(error,results,fields){
            if(error){
                console.log(error);
                res.end();
            }
        };

        function callPayment(error,results,fields){
            if(error){
                console.log(error);
                res.end();
            }
            console.log("Length: ",cart.length);
            for(var i = 0; i < cart.length; i++){
                console.log("i: ", i);
                inserts = [id,Number(cart[i]),1];
                console.log(inserts);
                contains2 = "INSERT INTO contains (orderid, merchid, quantity) VALUES (?,?,?)";
                contains = mysql.pool.query(contains2,inserts,callContains);
            }
            cart = [];
            };
        });
    

    return router;
}();