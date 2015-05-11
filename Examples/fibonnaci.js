var fibonacci = function(val) {
  var result = [];
  for(var i = 0; i <= val; i++) {
    if(i === 0) {
      result[i] = 0;
    } else if(i === 1) {
      result[i] = 1;
    } else {
      result[i] = result[i - 1] + result[i - 2];
    }
  }

  return result[val];
};

var fibonacci = function(val) { //use 34 as test argument?
  if(val === 0) {
    return 0;
  } else if(val === 1) {
    return 1;
  } else {
    return fibonacci(val - 1) + fibonacci(val - 2);
  }
};