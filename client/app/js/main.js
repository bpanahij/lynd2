'use strict'

require.config ({
  paths: {
    angular: 'lib/angular/angular',
    text: 'lib/require/text',
    jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
    iscroll: 'lib/iscroll/iscroll',
    async: 'lib/async/async',
    gmaps: 'lib/googlemaps/googlemaps',
    underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    socket: 'lib/socket.io/socket.io',
    bootstrap: 'lib/bootstrap/bootstrap.min'
  },
  baseUrl: '/app/js',
  shim: {
    'angular': {'exports': 'angular'},
    'angularMocks': {deps: ['angular'], 'exports': 'angular.mock'},
    'bootstrap' : ['jquery']
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
  'iscroll',
  'underscore',
  'socket',
  'bootstrap'
], function (app) {
//  $ ().loaded (function () {
    angular.bootstrap (document.getElementById ('lynd'), ['Lynd']);
//  })
});
