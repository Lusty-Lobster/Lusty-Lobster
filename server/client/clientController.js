var Task = require('../db/taskModel.js');


module.exports = {}
module.exports.get = function (req, res, next, code) {
  res.end();
};

module.exports.post = function (req, res, next) {
  if(!req.body.alg){
    res.send('invalid alg');
  }
  if(!req.body.data){
    res.send('invalid data');
  }
  var task = new Task({
    alg: req.body.alg,
    data: req.body.data,
    results: '[]',
    status: 'pending'
  }).save(function (err, task) {
    if (err) return console.error(err);
    console.log(req.body.alg,req.body.data);
    res.end();
  });
};
