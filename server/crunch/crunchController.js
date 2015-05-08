var Task = require('../db/taskModel.js');

var failThreshold = 4;
var successThreshold = 4;

module.exports = {}

var currentTask=null;

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var getNextTask = function(){
  Task.where({ complete: false }).findOne( function(err,obj) {
    if(err || !obj){
      getNextTask();
    } else {
      console.log('processing new task');
      obj.status = 'processing';

      obj.save(function(){
        currentTask=obj;

        if(IsJsonString(currentTask.data))
          currentTask.parsedData=JSON.parse(currentTask.data);
        else {
          currentTask.fail(getNextTask);
          currentTask=null;
          return;
        }

        currentTask.index=0;
        currentTask.completeCount=0;

        currentTask.parsedResults=[];
        currentTask.failures=[];

        for(var i=0; i<currentTask.parsedData.length;i++){
          currentTask.parsedResults[i]=[];
          currentTask.failures[i]=0;
        }
      });
    }
  });
};
getNextTask();
var DefaultTask = {
  alg: '(function(data){return data})',
  data: JSON.stringify([true]),
  task: -1,
  index: 0
};

module.exports.get = function (req, res, next, code) {
  //if there is no current task
  if(currentTask===null)
    return res.json({result: DefaultTask});

  //respond with the task
  res.json({result:
    {
      alg: currentTask.alg,
      data: JSON.stringify(currentTask.parsedData[currentTask.index]),
      task: currentTask._id,
      index: currentTask.index
    }
  });

  //find the next index that needs computation
  do {
    currentTask.index = (currentTask.index+1)%currentTask.parsedData.length;
  } while (currentTask.parsedResults[currentTask.index].length>=successThreshold)
}

module.exports.post = function (req, res, next) {
  res.end();
  
  if(currentTask===null) return; //if there is no current task, throw it away.
  if(req.body.task!=currentTask._id) return; //if the result is from an early task, throw it away.
  if(req.body.index===undefined || req.body.index===-1) return; //if the index is invalid, throw it away.
  if(currentTask.parsedResults[req.body.index].length>=successThreshold) return; //if we already have enough results for that peice of data, throw it away.

  if(currentTask.isResponseValid(req.body)){
    currentTask.parsedResults[req.body.index].push(req.body.result);
    console.log(req.body.index,currentTask.parsedResults[req.body.index]);
    if(currentTask.parsedResults[req.body.index].length>=successThreshold)
      currentTask.completeCount++;
    // if all of the results are conclusive then save the table to the DB and prepare the next test
    if(currentTask.completeCount>=currentTask.parsedData.length){
      currentTask.succeed(getNextTask);
      currentTask = null;
    }
  } else {
    currentTask.parsedResults[req.body.index] = [ ];
    currentTask.failures[req.body.index] ++;
    //if we have recieved too many failures then assume the test is not consistant
    if(currentTask.failures>failThreshold){
      currentTask.fail(getNextTask);
      currentTask=null;
    }
  }
}
