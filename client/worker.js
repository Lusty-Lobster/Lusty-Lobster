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

// try {
    // eval(alg)(data);
    //OLD WAY
    //(function(data){
    //  result=[];
    //  for( var i=1;i<data.length;i++){
    //    result[i]=data[i]*2;
    //  }
    //  return result;
    //})
    //(var helperFunction(){
    //  //does something
    //}
    //  //the actual thing it does goes down here
    //)
    //PROPOSED NEW WAY
    //  var helperFunct(){
    //    //does stuff
    //  }
    //  result=[];
    //  for( var i=1;i<data.length;i++){
    //    result[i]=data[i]*2;
    //  }
  // } catch (error) {
  //   result = error;
  // } finally {
  //   postMessage(result);
  // }
  