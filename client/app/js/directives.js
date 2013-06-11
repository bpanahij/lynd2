define(['angular', 'services'], function(angular, services) {
	'use strict';

	angular.module('Lynd.directives', ['Lynd.services'])
		.directive('appVersion', ['version', function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
		};
	}]);
});