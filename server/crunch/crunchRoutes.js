var crunchController = require('./crunchController.js');

module.exports = function (app) {
  app.route('/')
    .get(crunchController.get)
    .post(crunchController.post);
};
