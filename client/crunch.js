//client test stub
angular.module('crunchApp', [])
  .controller('crunchController', function($scope, $htpp) {
    
    //task object stored here
    $scope.taskObject;

    //grabs task and stores it into $scope.taskObject
    $scope.getTask = function() {
      $http.get('/api/').
        success(function(response, status, headers, config) {
          $scope.taskObject = response;

          //TODO: use johns SCRUBBER here...
          var data = $scope.taskObject.data;

          //eval is a native function to javascript
          //converts algorithm from string to js
          var result = eval($scope.taskObject.alg)();

          //post the stuff back
          $http.post('/api/', result).
            success(function(response, status, headers, config) {
              console.log('result successfully sent!');
            }).
            error(function(response, status, headers, config) {
              console.log('postTask error / client');
            });
        }).
        error(function(response, status, headers, config) {
          console.log('getTask error / client');
        });
    };


  });



