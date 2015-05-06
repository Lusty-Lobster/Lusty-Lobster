//client test stub
angular.module('crunchApp', [])
  .controller('crunchController', function($scope, $http) {
    
    //task object stored here
    $scope.taskObject;

    //grabs task and stores it into $scope.taskObject
    $scope.getTask = function() {
      $http.get('/api/crunch/')
      .success(function(response, status, headers, config) {
        $scope.taskObject = response.result;


        //eval is a native function to javascript
        //converts algorithm from string to js
        console.log($scope.taskObject);
        var result = eval($scope.taskObject.alg)($scope.taskObject.data);

        //post the stuff back
        $http.post('/api/crunch/', {
          result : result,
          index  : $scope.taskObject.index,
          task   : $scope.taskObject.task
        })
        .success(function(response, status, headers, config) {
          console.log('result successfully sent!');
          $scope.getTask();
        })
        .error(function(response, status, headers, config) {
          console.log('postTask error / client');
          $scope.getTask();
        });
      })
      .error(function(response, status, headers, config) {
        console.log('getTask error / client');
        $scope.getTask();
      });
    };


  });



