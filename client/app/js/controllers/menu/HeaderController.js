define ([], function () {
  return ['$scope', 'sidemenu', function ($scope, sidemenu) {
    sidemenu.invoke();
    $scope.toggleMenu = function() {
      sidemenu.toggleMenu();
    }
  }]
});