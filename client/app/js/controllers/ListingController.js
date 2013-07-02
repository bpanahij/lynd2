/**
 * ListingController
 */
define([], function() {
  return ['$scope', '$http', '$stateParams', 'listings', function($scope, $http, $stateParams, listings) {
    $scope.listingId = $stateParams.listingId;
    listings.getById(false, $scope.listingId, {lat:0, long:0}, function(listing) {
      $scope.listing = listing;
      $scope.$apply();
    })
    $scope.$apply();
  }];
});