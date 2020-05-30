module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function servepage(req, res){
        var query = 'SELECT title, merchType, price, quantity FROM merch WHERE user = "ISellWeapons"'
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderOfMerch(error, results, fields){
            //console.log(error)
            console.log(results)
            //console.log(fields)
            console.log("Query for user items")
            //take the results of that query and store ti inside context
            context.search = results;
       
            res.render('myitems', context)
        }
        mysql.pool.query(query, handleRenderOfMerch)
    });
    

    return router;
}();