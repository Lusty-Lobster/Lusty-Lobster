var mongoose = require('mongoose');

var CrunchSchema = new mongoose.Schema({
  name: String,
  alg: String, //a javascript function wrapped in an iffy, stuffed in a string.
  data: String, //a json'd array of data to push to crunchers
  results: String, //a json'd array of results from crunchers
  status: String, //a string holding a status message
  complete: Boolean
});
CrunchSchema.methods.fail = function(){
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
  this.status='complete';
  this.complete=true;
  this.save(cb);
  console.log('succeed');
};

var CrunchModel = mongoose.model('Crunch', CrunchSchema);
module.exports = CrunchModel;
