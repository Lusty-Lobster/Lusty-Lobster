//need to create package.json file via npm init

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

var tasks = [];

//for testing purposes
for(var i = 0; i < 1000; i++) {
  tasks.push(new Task([1, 2, 3, 4, 5, 6, 7, 8, 9], '(function() {
    var value = 0;
    for(var i = 0; i < data.length; i++) {
      value += data[i];
    }
    return value;
  })'));
}

app.get('/api/', function(request, response) {
  response.json(tasks.shift());
});

app.post('/api/', function(request, response) {
  result = request.body;
  console.log("result is: " + result);
  response.end(); //should respond with response 302
});

app.listen(port); 

