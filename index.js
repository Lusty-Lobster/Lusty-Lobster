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

var object = { 
  result: {
    alg: "function() { var v = 0; for(var i = 0; i < data.length; i++) {v += data[i]; } return v;}", 
    data: [1, 2, 3, 4, 5],
    id: "hash" 
  } 
};

var result;

app.get('/api/', function(request, response) {
  response.json(object);
});

app.post('/api/', function(request, response) {
  result = request.body;
  response.end(); //should respond with response 302
});

app.listen(port); 

