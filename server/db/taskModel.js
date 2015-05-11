var mongoose = require('mongoose');

var CrunchSchema = new mongoose.Schema({
  name: String,
  alg: String, //a javascript function wrapped in an iffy, stuffed in a string.
  data: String, //a json'd array of data to push to crunchers
  results: String, //a json'd array of results from crunchers
  status: String, //a string holding a status message
  complete: Boolean
});
CrunchSchema.methods.fail = function(cb){
  this.results='{}';
  this.status='failed';
  this.complete=true;
  this.save(cb);
  console.log('failed');
};
CrunchSchema.methods.succeed = function(cb){
  //flatten the results table and stringify it
  for(var i; i<this.parsedResults.length;i++){
    this.parsedResults[i]=this.parsedResults[i][0];
  }
  this.results=JSON.stringify(this.parsedResults);
  console.log(this.results);
  this.status='complete';
  this.complete=true;
  this.save(cb);
  console.log('succeed');
};

CrunchSchema.methods.isResponseValid = function( data ){
  for(var i=0; i<this.parsedResults[data.index].length; i++){
    //TODO: use a deep equals to support arrays and objects
    //stringify works... for now... lazy...
    if( JSON.stringify(data.result)!=JSON.stringify(this.parsedResults[data.index][i]) ){
      return false;
    }
  }
  return true;
}

var CrunchModel = mongoose.model('Crunch', CrunchSchema);
module.exports = CrunchModel;
