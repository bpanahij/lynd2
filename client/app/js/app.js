define (['angular'], function (angular, filters, services, directives, controllers) {
  'use strict';
  var Lynd = Lynd || {};
//  Lynd.Constants = angular.module ('Lynd.constants', []);
  Lynd.Services = angular.module ('Lynd.services', []);
  Lynd.Controllers = angular.module ('Lynd.controllers', []);
  Lynd.Filters = angular.module ('Lynd.filters', []);
  Lynd.Directives = angular.module ('Lynd.directives', []);
  angular.module ('Lynd', ['Lynd.services', 'Lynd.controllers', 'Lynd.filters', 'Lynd.directives'])
    .config (['$routeProvider', 'sidemenuProvider', 'socketioProvider', function ($routeProvider, sidemenuProvider) {

      sidemenuProvider.$get ().invoke ();

      $routeProvider
        .when ('/listing/:listingId', {
        templateUrl: '/app/partials/listing.html',
        controller: 'ListingController'
      })
        .when ('/search', {
        templateUrl: '/app/partials/search.html',
        controller: 'SearchController'
      })
        .when ('/map', {
        templateUrl: '/app/partials/map.html',
        controller: 'MapController'
      })
        .when ('/account', {
        templateUrl: '/app/partials/account.html',
        controller: 'AccountController'
      })
        .when ('/listings', {
        templateUrl: '/app/partials/listings.html',
        controller: 'ListingsController'
      })
        .when ('/listItem', {
        templateUrl: '/app/partials/listItem.html',
        controller: 'ListItemController'
      })
        .when ('/reservations', {
        templateUrl: '/app/partials/reservations.html',
        controller: 'ReservationController'
      })
        .otherwise ({redirectTo: '/search'});
    }]);
});
