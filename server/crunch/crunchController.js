var Task = require('../db/taskModel.js');

var failThreshold = 4;
var successThreshold = 4;

module.exports = {}

var currentTask=null;

var getNextTask = function(){
  currentTask = Task.findOne(function(err,obj) {
    if(err || !obj){
      getNextTask();
      //console.log('no tasks to perform');
    } else {
      console.log("findone found: ", obj);
      currentTask.status = 'processing';
      currentTask.parsedData=JSON.parse(currentTask.data);
      currentTask.results=[];
      currentTask.failures=[];
      for(var i; i<parsedData.length;i++){
        currentTask.results[i]=[];
        currentTask.failures[i]=0;
      }
      currentTask.index=0;
      currentTask.completeCount=0;
    }
  });
};
getNextTask();

module.exports.get = function (req, res, next, code) {
  //if there is no current task
  if(currentTask===null){
    //bail
    res.send('{error:"still initializing"}');
    return;
  }
  //respond with the task
  req.json({result:
    {
      alg: currentTask.alg,
      data: JSON.stringify(currentTask.parsedData[index]),
      task: currentTask.id,
      index: currentTask.index
    }
  });
  //find the next index that needs computation
  do {
    currentTask.index = (currentTask.index+1)%currentTask.parsedData.length;
  } while (currentTask.results[index].length>=successThreshold)
}

//TODO: refactor most of this into taskModel
module.exports.post = function (req, res, next) {
  //if the result is from an early task, throw it away.
  if(req.body.task!=currentTask.id)
    return;
  //if we have enough results for that peice of data, throw it away
  if(currentTask.results[req.body.index].length>=successThreshold)
    return;

  // check if the result equals the other results we have recieved.
  var valid = true;
  for(var i=0; i<currentTask.results[req.body.index].length; i++){
    //ASSUMES a table or object is not returned.
    //TODO: use a deep equals to support arrays and objects
    if(req.body.result!=currentTask.results[req.body.index][i]){
      currentTask.results[req.body.index] = [ ];
      currentTask.failures[req.body.index] ++;
      //if we have recieved too many failures then assume the test is not consistant
      if(currentTask.failures>failThreshold){
        currentTask.fail();
        return;
      }
      valid = false;
      break;
    }
  }

  // if the result is equal to the other results then add it to our results list
  if(valid){
    currentTask.results[req.body.index].push(req.body.result);
    if(currentTask.results[req.body.index].length>=successThreshold)
      currentTask.completeCount++;
  }
  // if all of the results are conclusive then save the table to the DB and prepare the next test
  if(currentTask.completeCount>=currentTask.parsedData.length){
    //flatten the results table and stringify it
    for(var i; i<currentTask.results.length;i++){
      currentTask.results[i]=currentTask.results[i][0];
    }
    currentTask.results=JSON.stringify(currentTask.results);
    //
    currentTask.success();
  }
}
