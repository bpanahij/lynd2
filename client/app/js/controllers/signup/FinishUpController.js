/**
 * SignupController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'facebook', 'user', 'auth', 'filepicker', function ($scope, $http, $location, facebook, user, auth, fp) {

    $scope.finishUp = function() {
      $location.path('/signup/stepFive')
    }
    $scope.$apply ()
  }]
})