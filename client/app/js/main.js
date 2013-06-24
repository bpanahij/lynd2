'use strict'

require.config ({
  paths: {
    angular: 'lib/angular/angular',
    angular_ui_router: 'lib/angular/angular-ui-router.min',
    text: 'lib/require/text',
    jquery: 'lib/jquery/jquery.min',
    iscroll: 'lib/iscroll/iscroll',
    async: 'lib/async/async',
    gmaps: 'lib/googlemaps/googlemaps',
    underscore: 'lib/underscore/underscore-local',
    socket: 'lib/socket.io/socket.io',
    bootstrap: 'lib/bootstrap/bootstrap.min'
  },
  baseUrl: '/app/js',
  shim: {
    'angular': {'exports': 'angular'},
    'angularMocks': {deps: ['angular'], 'exports': 'angular.mock'},
    'angular_ui_router': ['angular'],
    'bootstrap': ['jquery']
  },
  priority: [
    "angular"
  ]
});

require ([
  'app',
  'jquery',
  'services',
  'controllers',
  'filters',
  'directives',
  'angular',
  'gmaps',
  'angular_ui_router',
  'iscroll',
  'underscore',
  'socket',
  'bootstrap'
], function (app) {
  $ (document).ready (function () {
    angular.bootstrap (document.getElementById ('lynd'), ['Lynd']);
  })
});
