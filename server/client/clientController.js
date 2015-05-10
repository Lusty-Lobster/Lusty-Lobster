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
      console.log('TEST');
  console.log(req.body);
  if(!req.body.alg){
    res.send('invalid alg');
    return;
  }
  if(!req.body.data){
    res.send('invalid data');
    return;
  }
  console.log('new task recieved');
  var task = new Task({
    name: req.body.name,
    alg: req.body.alg,
    data: req.body.data,
    results: '[]',
    complete: false,
    status: 'pending'
  }).save(function (err, task) {
    if (err) return console.error(err);
    console.log('new task saved', task);
    res.end();
  });
};
