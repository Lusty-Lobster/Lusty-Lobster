// Web worker which will evaluate the algorithm on the piece of data
onmessage = function (e) {
  console.log('Algorithm and data recieved from Rabbit Hole');
  var alg = e.data[0];
  var data = e.data[1];
  var result;
  
  try {
    result = eval(alg)(JSON.parse(data));
  } catch (error) {
    result = error;
  } finally {
    postMessage(result);
  }
};
