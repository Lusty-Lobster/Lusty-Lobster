var findMatches = function(string, regex) {
  if(regex === undefined) {
    regex = /hello/g; //hardcoded to grab all strings with hello; can change this later if needed
  }

  var arrayMatches = string.match(regex);
  return arrayMatches.length;
};