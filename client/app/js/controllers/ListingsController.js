/**
 * ListingsController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'listings', 'user', function ($scope, $http, $location, listings, user) {
    $scope.listings = [];
    $scope.listingDetails = function () {
      $location.path ('/listing/' + this.listing._id);
    }
    $scope.getListings = function () {
      listings.getByUserId (false, user.isUserRegistered (), function (listings) {
        $scope.listings = listings;
        $scope.$apply ();
      })
    }
    $scope.getListings ();
    $scope.$apply ();
  }]
})