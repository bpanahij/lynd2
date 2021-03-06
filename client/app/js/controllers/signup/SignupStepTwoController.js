/**
 * SignupController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'facebook', 'user', 'auth', 'filepicker', function ($scope, $http, $location, facebook, user, auth, fp) {
    $scope.stars = [
      {class: "icon-star-empty"},
      {class: "icon-star-empty"},
      {class: "icon-star-empty"},
      {class: "icon-star-empty"},
      {class: "icon-star-empty"}
    ]
    $scope.profile = {}
    $scope.photos = []
    auth.getUser (function (err, profile) {
      $scope.profile = profile
      $scope.photos.push(profile.image)
      $scope.$apply ()
    })
    $scope.$watch('[profile.about, profile.email, profile.phone, profile.fullName, profile.location, profile.yearsSurfing]', function(newVals, oldVals) {
      var finished = _.reject(newVals, function(val) {
        return _.isEmpty(val)
      })
      if (finished.length >= 6) {
        $scope.buttonStatusClass = 'btn-success'
      } else {
        $scope.buttonStatusClass = ''
      }
    }, true)
    $scope.updateUserProfile = function () {
      if(_.isEmpty($scope.profile.email)) {
        $scope.emailError = 'Please provide your email address.'
        return;
      }
      if(_.isEmpty($scope.profile.phone)) {
        $scope.phoneError = 'Please provide your phone number.'
        return;
      }
      user.setCachedUser ($scope.profile)
      user.saveCachedUserProfile (function (err, profile) {
        $location.path ('/signup/stepThree')
        $scope.$apply ()
      })
    }

    $scope.addPhoto = function () {
      fp.uploadMultiple (120, 95, function () {
      }, function (err, photosArr) {
        $scope.profile.image = photosArr[0]
        $scope.$apply ()
      })
    }
    $scope.$apply ()
  }]
})