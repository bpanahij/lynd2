define (['angular', 'services'], function (angular, services) {
  'use strict';

  return angular.module ('Lynd.controllers', ['Lynd.services'])
    .controller ('IndexController', ['$scope', '$state', 'user', function ($scope, $state, user) {
      if(user.isUserRegistered()) {
        $state.transitionTo ('quiver');
      } else {
        $state.transitionTo ('signup_1');
      }
    }])
    .controller ('MenuProviderController', ['$scope', function ($scope) {
      require (['controllers/menu/MenuProviderController'], function (MenuProviderController) {
        angular.injector (['ng', 'Lynd.services']).invoke (MenuProviderController, this, {'$scope': $scope});
      });
    }])
    .controller ('SignupStepOneController', ['$scope', '$location', function ($scope, $location) {
      require (['controllers/signup/SignupStepOneController'], function (SignupStepOneController) {
        angular.injector (['ng', 'Lynd.services']).invoke (SignupStepOneController, this, {'$scope': $scope, '$location': $location});
      });
    }])
    .controller ('SignupStepTwoController', ['$scope', '$location', function ($scope, $location) {
      require (['controllers/signup/SignupStepTwoController'], function (SignupStepTwoController) {
        angular.injector (['ng', 'Lynd.services']).invoke (SignupStepTwoController, this, {'$scope': $scope, '$location': $location});
      });
    }])
    .controller ('SignupStepThreeController', ['$scope', '$location', function ($scope, $location) {
      require (['controllers/signup/SignupStepThreeController'], function (SignupStepThreeController) {
        angular.injector (['ng', 'Lynd.services']).invoke (SignupStepThreeController, this, {'$scope': $scope, '$location': $location});
      });
    }])
    .controller ('SignupStepFourController', ['$scope', '$location', function ($scope, $location) {
      require (['controllers/signup/SignupStepFourController'], function (SignupStepFourController) {
        angular.injector (['ng', 'Lynd.services']).invoke (SignupStepFourController, this, {'$scope': $scope, '$location': $location});
      });
    }])
    .controller ('SignupStepFiveController', ['$scope', '$location', function ($scope, $location) {
      require (['controllers/signup/SignupStepFiveController'], function (SignupStepFiveController) {
        angular.injector (['ng', 'Lynd.services']).invoke (SignupStepFiveController, this, {'$scope': $scope, '$location': $location});
      });
    }])
    .controller ('FinishUpController', ['$scope', '$location', function ($scope, $location) {
      require (['controllers/signup/FinishUpController'], function (FinishUpController) {
        angular.injector (['ng', 'Lynd.services']).invoke (FinishUpController, this, {'$scope': $scope, '$location': $location});
      });
    }])
    .controller ('SearchController', ['$scope', function ($scope) {
      require (['controllers/SearchController'], function (SearchController) {
        angular.injector (['ng', 'Lynd.services', 'Lynd.filters']).invoke (SearchController, this, {'$scope': $scope});
      });
    }])
    .controller ('SearchHeaderController', ['$scope', function ($scope) {
      require (['controllers/SearchHeaderController'], function (SearchHeaderController) {
        angular.injector (['ng', 'Lynd.services', 'Lynd.filters']).invoke (SearchHeaderController, this, {'$scope': $scope});
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
        angular.injector (['ng', 'Lynd.services']).invoke (AccountController, this, {'$scope': $scope});
      });
    }])
    .controller ('ListingController', ['$scope', '$routeParams', function ($scope, $routeParams) {
      require (['controllers/ListingController'], function (ListingController) {
        angular.injector (['ng', 'Lynd.services']).invoke (ListingController, this, {'$scope': $scope, '$routeParams': $routeParams});
      });
    }])
    .controller ('ListingsController', ['$scope', '$location', function ($scope, $location) {
      require (['controllers/ListingsController'], function (ListingsController) {
        angular.injector (['ng', 'Lynd.services']).invoke (ListingsController, this, {'$scope': $scope, '$location': $location});
      });
    }])
    .controller ('ListItemController', ['$scope', '$location', function ($scope, $location) {
      require (['controllers/ListItemController'], function (ListItemController) {
        angular.injector (['ng', 'Lynd.services']).invoke (ListItemController, this, {'$scope': $scope, '$location': $location});
      });
    }])
    .controller ('ReservationController', ['$scope', function ($scope) {
      require (['controllers/ReservationController'], function (ReservationController) {
        angular.injector (['ng', 'Lynd.services']).invoke (ReservationController, this, {'$scope': $scope});
      });
    }]);
});