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
    auth.getUser (function (err, profile) {
      $scope.profile = profile
      $scope.photos.push(profile.image)
      $scope.$apply ()
    })
    $scope.photos = []

    $scope.updateUserProfile = function () {
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