//perspective: client who submits data/algorithm request

angular.module('submitApp', [])
  .controller('submitController', function($scope, $http) {
    $scope.dataObject;

    //
    $scope.submit = function() {
      $scope.dataObject = {
        data: $scope.dataModel,
        alg: $scope.algorithmModel
      };

      //clear textareas after submitting
      /*$scope.algorithmModel = '';
      $scope.dataModel = '';*/

      $http.post('/api/client', $scope.dataObject).
        success(function(data, status, headers, config) {
          console.log('Successfully submits / submit.js');
        }).
        error(function(data, status, headers, config) {
          console.log('Error in submit function / submit.js');
        });
    };

    //for get, /api/client/?id
    $scope.getResults = function() {

    };
  });