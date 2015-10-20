var express = require('express');
var bodyParser = require('body-parser');
var reload = require('reload');
var http = require('http');
var cons = require('consolidate');
var webapi = require('./webapi/webapi.js');
var mongoService = require('./services/mongoService.js');

app = express();
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.use('/js', express.static(__dirname + '/static/javascript'));
app.use(bodyParser.json());

mongoService.connect('mongodb://localhost/test');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/order', function(req, res) {
    res.render('order');
});

webapi.initialize(app);

app.get('*', function(req, res){
  res.render('404');
});

var server = http.createServer(app);
reload(server, app, 300, true);

app.listen(3001);
console.log('app rodando na porta 3001');
