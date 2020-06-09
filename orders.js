module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function servepage(req, res){

        var user = req.app.get('user');
        inserts=[user];
        var query = 'SELECT id, ordertype FROM orders WHERE buyUser = (?)'
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderOfMerch(error, results, fields){
            //console.log(error)
            console.log(results)
            //take the results of that query and store ti inside context
            context.search = results;
       
            res.render('orders', context)
        }
        mysql.pool.query(query,inserts, handleRenderOfMerch)
    });

    router.get('/delete/:id', function (req, res){
        var mysql = req.app.get('mysql');

        var inserts = [req.query.id]
        console.log("deleting ",req.query.id);
        var query = 'DELETE FROM orders WHERE id = ?';
        console.log(inserts);
        query = mysql.pool.query(query,inserts,function(error, results, fields){
            if(error){
                console.log(error);
                res.end();
            }else{
                res.redirect('/orders');
            }
        });
    });
    

    return router;
}();