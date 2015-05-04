var Task = require('../db/taskModel.js');
console.log('initializing crunchController');

var failThreshold = 4;
var successThreshold = 4;

module.exports = {}

var currentTask=null;

var getNextTask = function(){
  Task.where({ complete: false }).findOne(function(err,obj) {
    if(err || !obj){
      getNextTask();
      //console.log('no tasks to perform');
    } else {
      console.log('processing new task');
      currentTask=obj;
      currentTask.status = 'processing';
      currentTask.parsedData=JSON.parse(currentTask.data);
      currentTask.parsedResults=[];
      currentTask.failures=[];
      for(var i=0; i<currentTask.parsedData.length;i++){
        currentTask.parsedResults[i]=[];
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
      //return default task
      res.json({result:
        {
          alg: '(function(data){return data})',
          data: JSON.stringify([true]),
          task: -1,
          index: 0
        }
      });
    return;
  }
  //respond with the task
  res.json({result:
    {
      alg: currentTask.alg,
      data: JSON.stringify(currentTask.parsedData[currentTask.index]),
      task: currentTask.id,
      index: currentTask.index
    }
  });
  //find the next index that needs computation
  do {
    currentTask.index = (currentTask.index+1)%currentTask.parsedData.length;
  } while (currentTask.parsedResults[currentTask.index].length>=successThreshold)
}

//TODO: refactor most of this into taskModel
module.exports.post = function (req, res, next) {
  res.end();
  //========================================================================
  //the rest of the logic in this function is broken.
  //So that the front end team can continue I'm going to cut off the codes execution here
  //as far as the front ends logic is concerned the backend will be fully functional.
  return;
  //if the result is from an early task, throw it away.
  if(currentTask===null)
    return;
  //console.log('====================================', req.body);
  if(req.body.task!=currentTask.id)
    return;
  //console.log(currentTask);
  //if we already have enough results for that peice of data, throw it away
  if(currentTask.parsedResults[req.body.index].length>=successThreshold)
    return;

  // TODO: Use a better method to check if its valid.

  var valid = true;
  // CHECK IF ITS VALID
  // (check if the result equals the other results we have recieved)
  for(var i=0; i<currentTask.parsedResults[req.body.index].length; i++){
    //ASSUMES a table or object is not returned.
    //TODO: use a deep equals to support arrays and objects
    if(req.body.result!=currentTask.results[req.body.index][i]){
      currentTask.parsedResults[req.body.index] = [ ];
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
    currentTask.parsedResults[req.body.index].push(req.body.result);
    console.log(currentTask.parsedResults[req.body.index]);
    if(currentTask.results[req.body.index].length>=successThreshold)
      currentTask.completeCount++;
  }
  // if all of the results are conclusive then save the table to the DB and prepare the next test
  if(currentTask.completeCount>=currentTask.parsedData.length){
    //flatten the results table and stringify it
    for(var i; i<currentTask.parsedResults.length;i++){
      currentTask.parsedResults[i]=currentTask.parsedResults[i][0];
    }
    currentTask.results=JSON.stringify(currentTask.parsedResults);

    currentTask.success();
    console.log('done');
  }
}
