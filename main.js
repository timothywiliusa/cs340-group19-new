/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var user = "";

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.set('user', user);
app.use('/people_certs', require('./people_certs.js'));
app.use('/people', require('./people.js'));
app.use('/planets', require('./planets.js'));
app.use('/search', require('./search.js'));
app.use('/newsale', require('./newsale.js'));
app.use('/myitems', require('./myitems.js'));
app.use('/profile', require('./profile.js'));
app.use('/checkout', require('./checkout.js'));
app.use('/thank', require('./thank.js'));
app.use('/edit', require('./edit.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
