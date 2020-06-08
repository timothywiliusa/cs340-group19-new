module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function servePage2(req,res){
        var query = "SELECT username, zip, planetNum, Xcoord, Ycoord, POBox FROM user WHERE username = (?)"
        var inserts = req.app.get('user');
        console.log(inserts)
        var mysql = req.app.get('mysql');
        var context = {};

        function handleProfile(error, results, fields){
                console.log(results);
                if(results.length > 0){
                    context.profile = results;
                    var user = req.app.get('user');
                    user = req.query.username;
                    console.log(user);
                    res.render('profile', context)
                }
                else{
                    console.log("No profile found")
                    res.redirect('../')
                }
        }
        mysql.pool.query(query, inserts, handleProfile)
    });
    router.get('/edit', function servePage2(req,res){
        var query = "UPDATE user SET zip=?, planetNum=?, Xcoord=?, Ycoord=?, POBox=? WHERE username = ?"
        var inserts = [req.query.zip, req.query.planet, req.query.xcoord, req.query.ycoord, req.query.po, req.app.get('user')];
        console.log(inserts)
        var mysql = req.app.get('mysql');
        var context = {};

        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.end();
            }
            else{
                res.redirect('/profile')
            }
        })
    });


    router.get('/log', function servepage(req, res){
        var query = "SELECT username, zip, planetNum, Xcoord, Ycoord, POBox FROM user WHERE username = (?)"
        var inserts = req.query.username;
        console.log(inserts)
        var mysql = req.app.get('mysql');
        var context = {};

        function handleProfile(error, results, fields){
                console.log(results);
                if(results.length > 0){
                    context.profile = results;
                    var user = req.query.username;
                    req.app.set('user', user);
                    console.log(user);
                    res.render('profile', context)
                }
                else{
                    console.log("No profile found")
                    res.redirect('../')
                }
        }
        mysql.pool.query(query, inserts, handleProfile)
    });

    router.post('/',function servepage(req, res){
        var query = 'INSERT INTO user (username, passcode, zip, planetNum, Xcoord, Ycoord, POBox) VALUES (?,?,?,?,?,?,?)';
        var inserts = [req.body.usernamereg, req.body.passcodereg, req.body.zip, req.body.planetNum, req.body.Xcoord, req.body.Ycoord, req.body.POBox]
        var user = req.app.get('user');
        user = req.body.usernamereg;
        console.log(user);
        var mysql = req.app.get('mysql');
        console.log(inserts)

        query = mysql.pool.query(query,inserts,function(error, results,fields){
        if(error){
            res.end();
        }
        else{
            res.redirect('../')
        }

    });
    });

    return router;
}();