/**
 * SearchController
 */
define ([], function () {
  return ['$scope', '$http', 'listings', 'geocoder', 'listings', '$rootScope', function ($scope, $http, listings, geocoder, $rootScope) {
    geocoder.getCurLocation (function (err, loc) {
      $scope.geoCode = loc.geocode
      $scope.locations = loc.addresses
      $scope.$apply ()
      $scope.newSearch ()
    });
    $scope.newSearch = function () {
      listings.getByDistance(false, $scope.geoCode, 10, function(listings) {
        $scope.listings = listings
        $scope.$apply ()
      })
    }
    $scope.$apply ()
  }];
});