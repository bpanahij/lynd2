/**
 * ListItemController
 */
define ([], function () {
  return ['$scope', '$http', 'socketio', 'geocoder', '$window', function ($scope, $http, socketio, geocoder, $window) {
    geocoder.getCurLocation (function (err, loc) {
      $scope.geoCode = loc.geocode;
      $scope.locations = loc.addresses;
      $scope.$apply ();
    });
    $scope.values = _.range (0, 1000, 25);
    $scope.prices = _.range (0, 100, 2);
    $scope.photos = [];
    $scope.choosePhotos = function () {
      require (['http://api.filepicker.io/v1/filepicker.js'], function (fp) {
        filepicker.setKey ('AkKd1EC5mTSiABybvVCKjz');
        filepicker.pickMultiple (function (fpfiles) {
          _.each (fpfiles, function (file) {
            filepicker.convert (file, {width: 600, height: 400},
              function (newFPFile) {
                filepicker.store (newFPFile, function (FPFile) {
                  $scope.photos.push (FPFile.url);
                  $scope.$apply ();
                }, function (FPError) {
                  console.log (FPError.toString ());
                }, function (progress) {
                  console.log ("Loading: " + progress + "%");
                  if (progress == 100) {
                    $scope.$apply ();
                  }
                });
              });
          });
        });
      });

      filepicker.convert (fpfile, {width: 200, height: 200},
        function (new_FPFile) {
          console.log (new_FPFile.url);
          result.src = new_FPFile.url;
        }
      );

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
      socketio.emit ('add', listing);
    }
    socketio.on ('addSuccess', function () {
      $window.location = '#/search';
    });
    $scope.$apply ();
  }];
});