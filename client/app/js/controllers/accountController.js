/**
 * AccountController
 */
define ([], function () {
  return ['$scope', '$http', 'balanced', 'user', 'facebook', function ($scope, $http, balanced, user, facebook) {
    $scope.marketplace = {}
    var cachedUser = user.getCachedUser ()
    if (_.isEmpty (cachedUser)) {
      facebook.loginWithFacebook (function (err, profile) {
        _.extend ($scope, profile)
        $scope.$apply ()
      })
    }
    _.extend ($scope, cachedUser)
    $scope.$apply ();
    $scope.getAccount = function () {
      balanced.get (false, function (marketplace) {
        $scope.marketplace = marketplace
      })
    }

    $scope.$apply ();
    $tabs = $ ('#accountTabs a')
    $tabs.click (function (e) {
      e.preventDefault ()
      $ (this).tab ('show')
    })
    $tabs.first ().tab ('show')
  }]
})