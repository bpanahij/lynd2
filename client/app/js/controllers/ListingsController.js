/**
 * ListingsController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'listings', 'user', function ($scope, $http, $location, listings, user) {
    $scope.listings = []
    $scope.listingDetails = function(id) {
      $location.path('/listing/' + id)
      $scope.$apply()
    }
    $scope.getListings = function () {
      listings.getByUserId (false, 0, function (listings) {
        $scope.listings = listings
        $scope.$apply ()
      })
    }
    $scope.getListings()
    $scope.$apply ()
    var $tabs = $ ('#listingsTabs a')
      .click (function (e) {
        e.preventDefault ()
        $ (this).tab ('show')
      })
    $tabs.first ().tab ('show')
  }]
})