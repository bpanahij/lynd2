/**
 * SignupController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'facebook', 'user', 'auth', 'filepicker', function ($scope, $http, $location, facebook, user, auth, fp) {

    $scope.stepThree = function() {
      $location.path('/signup/stepThree')
    }
    $scope.stepFour = function() {
      $location.path('/signup/stepFour')
    }
    $scope.stepFive = function() {
      $location.path('/signup/stepFive')
    }
    $scope.$apply ()
  }]
})