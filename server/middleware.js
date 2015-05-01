var bodyParser  = require('body-parser');

module.exports = function (app, express) {

  var crunchRouter = express.Router();
  var clientRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + './../client'));


  app.use('/api/crunch', crunchRouter);
  app.use('/api/client', clientRouter);

  require('./crunch/crunchRoutes.js')(crunchRouter);
  require('./client/clientRoutes.js')(clientRouter);
};
