define ([], function () {
  return ['$scope', 'sidemenu', '$location', function ($scope, sidemenu, $location) {
    sidemenu.invoke();
    $scope.toggleMenu = function() {
      sidemenu.toggleMenu();
    }
    $scope.quiver = function() {
      $location.path('/quiver');
    }
    $scope.addToQuiver = function() {
      $location.path('/addToQuiver');
    }
  }];
});