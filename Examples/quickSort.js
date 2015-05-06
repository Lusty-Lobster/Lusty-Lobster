//Used in createRandomizedArray
var randomGenerator = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Used in createRandomizedArray
var numberOrLetter = function(value) {
  return 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[value]; //0 - 60
};

//Crrates a randomized array of some specified size
var createRandomizedArray = function(size) {
  var result = [];
  for(var i = 0; i < size; i++) {
    var randomIndex = randomGenerator(0, 60);
    var randomValue = numberOrLetter(randomIndex);
    result.push(randomValue);
  }

  return result;
};

//Main function
var quickSort = function(array) {
  if(array.length === 0) {
    return [];
  }

  var left = [];
  var right = [];
  var pivot = array[0];

  for(var i = 1; i < array.length; i++) {
    if(array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
};



