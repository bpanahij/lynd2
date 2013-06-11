define (['angular', 'services'], function (angular, services) {
  'use strict';

  angular.module ('Lynd.filters', ['Lynd.services'])
    .filter ('interpolate', ['version', function (version) {
      return function (text) {
        return String (text).replace (/\%VERSION\%/mg, version);
      };
    }])
    .filter ('limitCharacters', [function () {
      return function (text, num) {
        return text && String (text).substr (0, num) + (text.length > num ?  '...' : '') || text;
      };
    }])
    .filter('placeholder', [function() {
      return function (img, size) {
        return img && img || 'http://placehold.it/'+size;
      }
    }]);
});
