define (['angular', 'services', 'gmaps'], function (angular, services) {
  'use strict';

  return angular.module ('Lynd.controllers', ['Lynd.services'])
    .controller ('SearchController', ['$scope', function ($scope) {
      require (['controllers/SearchController'], function (SearchController) {
        angular.injector (['ng', 'Lynd.services', 'Lynd.filters']).invoke (SearchController, this, {'$scope': $scope});
      });
    }])
    .controller ('MapController', ['$scope', function ($scope) {
      require (['https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false',
        'controllers/MapController'], function (googleMaps, mapController) {
        angular.injector (['ng', 'Lynd.services']).invoke (mapController, this, {'$scope': $scope});
        var mapOptions = {
          zoom: 8,
          center: new google.maps.LatLng (- 34.397, 150.644),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map (document.getElementById ('map-canvas'), mapOptions);
      });
    }])
    .controller ('AccountController', ['$scope', function ($scope) {
      require (['controllers/AccountController'], function (AccountController) {
        angular.injector (['ng']).invoke (AccountController, this, {'$scope': $scope});
      });
    }])
    .controller ('ListingController', ['$scope', '$routeParams', function ($scope, $routeParams) {
      require (['controllers/ListingController'], function (ListingController) {
        angular.injector (['ng', 'Lynd.services']).invoke (ListingController, this, {'$scope': $scope, '$routeParams': $routeParams});
      });
    }])
    .controller ('ListingsController', ['$scope', function ($scope) {
      require (['controllers/ListingsController'], function (ListingsController) {
        angular.injector (['ng']).invoke (ListingsController, this, {'$scope': $scope});
      });
    }])
    .controller ('ListItemController', ['$scope', function ($scope) {
      require (['controllers/ListItemController'], function (ListItemController) {
        angular.injector (['ng', 'Lynd.services']).invoke (ListItemController, this, {'$scope': $scope});
      });
    }])
    .controller ('ReservationController', ['$scope', function ($scope) {
      require (['controllers/ReservationController'], function (ReservationController) {
        angular.injector (['ng']).invoke (ReservationController, this, {'$scope': $scope});
      });
    }]);
});