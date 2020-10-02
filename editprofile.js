module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function servepage(req, res){
        var mysql = req.app.get('mysql');
        var user = req.app.get('user');
        var context = {};

        var inserts = [user]
        var query = "SELECT zip, planetNum, Xcoord, Ycoord, POBox FROM user WHERE username = (?)";
        console.log(inserts);
        function handleRender(error, results, fields){
            console.log(results)
            
            //take the results of that query and store ti inside context
            context.search = results;
       
            res.render('editprofile', context)
        }
        mysql.pool.query(query,inserts, handleRender)
    });
    

    return router;
}();