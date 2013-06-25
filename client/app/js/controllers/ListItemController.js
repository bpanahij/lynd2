/**
 * ListItemController
 */
define ([], function () {
  return ['$scope', '$http', '$location', 'listings', 'geocoder', 'filepicker', '$window', 'user', function ($scope, $http, $location, listings, geocoder, fp, $window, user) {
    geocoder.getCurLocation (function (err, loc) {
      $scope.geoCode = loc.geocode
      $scope.locations = loc.addresses
      $scope.location = loc.addresses[1].address
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
        userId: user.isUserRegistered(),
        title: $scope.title,
        description: $scope.description,
        location: $scope.location,
        geoCode: $scope.geoCode,
        images: $scope.photos,
        price: $scope.price,
        value: $scope.value
      }
      listings.add (listing, function () {
        $location.path('/quiver')
        $scope.$apply ()
      })
    }
  }]
})