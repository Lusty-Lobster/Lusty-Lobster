var clientController = require('./clientController.js');

module.exports = function (app) {
  app.route('/')
    .get(clientController.get)
    .post(clientController.post);
};
