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
var bubbleSort = function(array) {
  var alreadySorted = false;
  while(alreadySorted === false) {
    alreadySorted = true;
    for(var i = 1; i < array.length; i++) {
      if(array[i - 1] > array[i]) {
        alreadySorted = false;

        var temp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = temp;
      }
    }
  }

  return array;
};