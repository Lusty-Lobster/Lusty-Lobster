var Task = require('../db/taskModel.js');


module.exports = {};
var _id;
module.exports.parseParam = function (req, res, next, id) {
  _id=id;
  next();
};


module.exports.getById = function(req, res, next){
  Task.where({ "_id":_id}).findOne(function(err,obj) {
    if (!err) {
        return res.send({result:obj});
    } else {
        return res.send({ status: '500 Server error' });
    }
  });
};

module.exports.get = function (req, res, next) {
  var myQuery = Task.find();
  myQuery.select('-data');
  myQuery.select('-results');

  myQuery.exec(function (err, items) {
    if (!err) {
        return res.send({result:items});
    } else {
        return res.send({ status: '500 Server error' });
    }
  });
};

module.exports.post = function (req, res, next) {
  if(!req.body.alg){
    res.send('invalid alg');
  }
  if(!req.body.data){
    res.send('invalid data');
  }
  console.log('new task recieved');
  var task = new Task({
    alg: req.body.alg,
    data: req.body.data,
    results: '[]',
    complete: false,
    status: 'pending'
  }).save(function (err, task) {
    if (err) return console.error(err);
    console.log(req.body.alg,req.body.data);
    res.end();
  });
};
