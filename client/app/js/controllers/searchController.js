/**
 * SearchController
 */
define ([], function () {
  return ['$scope', '$http', 'socketio', 'geocoder', function ($scope, $http, socketio, geocoder) {
    var myScroll;
    geocoder.getCurLocation (function (err, loc) {
      $scope.geoCode = loc.geocode;
      $scope.locations = loc.addresses;
      $scope.$apply ();
      $scope.newSearch ();
    });
    $scope.searchString = '';
    $scope.newSearch = function () {
      socketio.emit ('findByDistance', {
        geoCode: $scope.geoCode,
        distance: 10
      });
    }
    socketio.on ('findByDistanceSuccess', function (listings) {
      $scope.listings = listings;
      $scope.$apply ();
//      myScroll.refresh ();
      setScroll();
    });
    $scope.$apply ();
    window.addEventListener ('load', setScroll, false);
    var setScroll = function () {
      setTimeout (function () {
        myScroll = new iScroll ('wrapper');
      }, 100);
    }
  }];
});