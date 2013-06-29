/**
 * SearchController
 */
define ([], function () {
  return ['$scope', '$http', 'listings', 'geocoder', 'sidemenu', function ($scope, $http, listings, geocoder, sidemenu) {
    sidemenu.invoke();
    geocoder.getCurLocation (function (err, loc) {
      $scope.geoCode = loc.geocode;
      $scope.locations = loc.addresses;
      $scope.$apply ();
      $scope.newSearch ();
    });
    $scope.toggleMenu = function() {
      sidemenu.toggleMenu();
    }
    $scope.newSearch = function () {
      listings.getByDistance(false, $scope.geoCode, 10, function(listings) {
        $scope.listings = listings;
        $scope.$apply ();
      });
    }
    $scope.$apply ();
  }];
});