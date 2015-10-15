var express = require('express');
var cons = require('consolidate');
var webapi = require('./webapi.js');

app = express();
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.use('/js', express.static(__dirname + '/static/javascript'));

app.get('/', function(req, res) {
    res.render('index');
});
app.get('/home', function(req, res) {
    res.render('home');
});

webapi.initialize(app);

app.listen(3000);
console.log('app rodando na prota 3000');