/**
 * SignupController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'facebook', 'user', 'auth', 'filepicker', function ($scope, $http, $location, facebook, user, auth, fp) {

    $scope.addToQuiver = function() {
      $location.path('/addToQuiver')
    }
    $scope.search = function() {
      $location.path('/search')
    }
    $scope.$apply ()
  }]
})