'use strict'

require.config ({
  paths: {
    async: 'lib/asyncLib/async',
    socket: 'lib/socket.io/socket.io',
    angular: 'lib/angular/angular.min'
  },
  baseUrl: '/app/js',
  shim: {

  },
  priority: [
    'angular'
  ]
});

require ([
//  'angular',
  'app',
  'async',
  'services',
  'controllers',
  'filters',
  'directives',
  'socket',
], function (app) {
  $ (document).ready (function () {
    angular.bootstrap (document.getElementById ('lynd'), ['Lynd']);
  })
});
