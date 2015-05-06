var powerSet = function(string) {
  if(string === undefined) {
    string = '';
  }

  var letters = {};
  for(var i = 0; i < string.length; i++) {
    letters[string[i]] = true;
  }

  string = Object.keys(letters).join('');

  var solutions = [];
  var recurse = function(index, subset) {
    if(index >= string.length) {
      solutions.push(subset);
      return;
    }

    recurse(index + 1, subset);
    recurse(index + 1, subset + string[index]);
  };

  recurse(0, '');

  return solutions.sort();
};



