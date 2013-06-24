/**
 * ListItemController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'listings', 'geocoder', 'filepicker', '$window', function ($scope, $http, $location, listings, geocoder, fp, $window) {
    geocoder.getCurLocation (function (err, loc) {
      $scope.geoCode = loc.geocode
      $scope.locations = loc.addresses
      $scope.$apply ()
    })
    $scope.values = _.range (0, 1000, 25)
    $scope.prices = _.range (0, 100, 2)
    $scope.photos = []
    $scope.$apply()
    $scope.choosePhotos = function () {
      fp.uploadMultiple(600, 400, function() {}, function(err, photosArr) {
        $scope.photos = photosArr;
      })
    }
    $scope.saveListing = function () {
      var listing = {
        userId: 0,
        title: $scope.title,
        description: $scope.description,
        location: $scope.location,
        geoCode: $scope.geoCode,
        images: $scope.photos,
        price: $scope.price,
        value: $scope.value
      }
      listings.add (listing, function () {
        $location.path('/search')
        $scope.$apply ()
      })
    }
  }]
})