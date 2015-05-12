var bodyParser  = require('body-parser');

var crunchController = require('./crunch/crunchController.js');
var clientController = require('./client/clientController.js');

module.exports = function (app, express) {

  app.use(bodyParser.urlencoded({extended: true, limit: '250mb'}));
  app.use(bodyParser.json({limit: '250mb'}));
  app.use(express.static(__dirname + './../client'));

  //This doesnt work...
  //app.get('/api', crunchController.get);

  //this does...
  //todo, figure out why it doesn't work the other way...
  app.get('/api/crunch', function(){crunchController.get.apply(crunchController,arguments)});
  app.post('/api/crunch', function(){crunchController.post.apply(crunchController,arguments)});

  app.param('id', function(){clientController.parseParam.apply(clientController,arguments)});
  app.get('/api/client/:id', function(){clientController.getById.apply(clientController,arguments)});

  app.get('/api/client', function(){clientController.get.apply(clientController,arguments)});
  app.post('/api/client', function(){clientController.post.apply(clientController,arguments)});
  // app.use('/api/crunch', crunchRouter);
  //app.use('/api/client', clientRouter);
};
