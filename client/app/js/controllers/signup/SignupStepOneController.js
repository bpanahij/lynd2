/**
 * SignupController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'facebook', 'user', 'auth', 'filepicker', function ($scope, $http, $location, facebook, user, auth, fp) {
    $scope.signUpFacebook = function () {
        facebook.loginWithFacebook (function (err, profile) {
          if (profile) {
            $location.path ('/signup/stepTwo')
            $scope.$apply ()
          } else {
            $location.path ('/search')
            $scope.$apply ()
          }
        })
    }

    $scope.signupEmail = function () {

    }
    $scope.$apply ()
  }]
})