var mongoose = require('mongoose');

var CrunchSchema = new mongoose.Schema({
  alg: String, //a javascript function wrapped in an iffy, stuffed in a string.
  data: String, //a json'd array of data to push to crunchers
  results: String, //a json'd array of results from crunchers
  status: String //a string holding a status message
});

module.exports = mongoose.model('Crunch', CrunchSchema);
