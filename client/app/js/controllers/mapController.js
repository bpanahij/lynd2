define([], function() {
  return ['$scope', '$http', function($scope, $http) {
    $scope.callToAction = 'Where are you surfing?';
    $scope.$apply();
  }];
});