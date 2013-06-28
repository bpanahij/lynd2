/**
 * ListingController
 */
define([], function() {
  return ['$scope', '$http', '$routeParams', 'listings', function($scope, $http, $routeParams, listings) {
    $scope.listingId = $routeParams.listingId;
    listings.getById(false, $scope.listingId, {lat:0, long:0}, function(listing) {
      $scope.listing = listing;
      $scope.$apply();
    })
    $scope.$apply();
  }];
});