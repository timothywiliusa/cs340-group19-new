module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/:id', function servepage(req, res){
        console.log(req.query.id);
        var inserts = req.query.id;
        var myquery = 'SELECT id, title, merchType, price, quantity, photo FROM merch WHERE id = (?)'
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRender(error, results, fields){
            console.log(results);
            context.search = results;
            //pass it to handlebars to put inside a file
            res.render('edit', context)
          }
        mysql.pool.query(myquery, inserts, handleRender);
    });
    

    return router;
}();