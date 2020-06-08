module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function servepage(req, res){
        var user = req.app.get('user');
        inserts=[user];
        var query = 'SELECT id, title, merchType, price, quantity FROM merch WHERE user = (?)'
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
        mysql.pool.query(query,inserts, handleRenderOfMerch)
    });
    router.get('/delete/:id', function (req, res){
        var mysql = req.app.get('mysql');

        var inserts = [req.query.id]
        console.log("deleting ",req.query.id);
        var query = 'DELETE FROM merch WHERE id = ?';
        console.log(inserts);
        query = mysql.pool.query(query,inserts,function(error, results, fields){
            if(error){
                console.log(error);
                res.end();
            }else{
                res.redirect('/myitems');
            }
        });
    });
    
    router.post('/', function (req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body.title)
        console.log(req.body.type)
        console.log(req.body.quantity)
        console.log(req.body.url)
        console.log(req.body.cost)
        var user = req.app.get('user');

        var inserts = [req.body.title, req.body.url, req.body.type, req.body.quantity, req.body.cost, user]
        var query = 'INSERT INTO merch (title, photo, merchType, quantity, price, user) VALUES (?,?,?,?,?,?)';

        query = mysql.pool.query(query,inserts,function(error, results, fields){
            if(error){
                res.end();
            }else{
                res.redirect('/myitems');
            }
        });
    });
    router.post('/edit', function (req, res){
        var mysql = req.app.get('mysql');

        var inserts = [req.body.title, req.body.url, req.body.type, req.body.quantity, req.body.cost, req.body.id]
        var query = 'UPDATE merch SET title = ?, photo = ?, merchType = ?, quantity = ?, price = ? WHERE id = ?';
        console.log(inserts);
        query = mysql.pool.query(query,inserts,function(error, results, fields){
            if(error){
                console.log(error);
                res.end();
            }else{
                res.redirect('/myitems');
            }
        });
    });
    return router;
}();