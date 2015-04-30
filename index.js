//server 
var express = require('express'); //npm install express --save
var app = express();

var bodyParser = require('body-parser'); //npm install body-parser --save

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 80;

app.use(express.static(__dirname + "/client"));

var object = { results: {alg: "function() { for(var i = 0; i < data.length; i++) {return data[i]; }}", data: [1, 2, 3, 4, 5]} };

app.get('/api/', function(request, response) {
  response.json(object);
});

app.listen(port);

