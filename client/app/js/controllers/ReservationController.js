/**
 * ReservationController
 */
define([], function() {
  return ['$scope', '$http', 'listings', function($scope, $http, listings) {
    $scope.listings = [];
    $scope.getListings = function () {
      listings.getByUserId (false, 0, function (listings) {
        $scope.listings = listings;
        $scope.$apply ();
      })
    }
    $scope.getListings();
  }];
});