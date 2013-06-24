define (['angular', 'services'], function (angular, services) {
  'use strict';

  angular.module ('Lynd.filters', ['Lynd.services'])
    .filter ('limitCharacters', [function () {
      return function (text, num) {
        return text && String (text).substr (0, num) + (text.length > num ? '...' : '') || text;
      };
    }])
    .filter ('quiverPlaceholdIt', [function () {
      return function (img, size) {
        return img && img || '/assets/img/quiver.png'
      }
    }])
    .filter ('wholeDollar', [function () {
      return function (amount) {
        return '$' + Number (amount).toFixed (0)
      }
    }])
    .filter ('placeholdIt', [function () {
      return function (img, size) {
        return img && img || 'http://placehold.it/' + size;
      }
    }])
    .filter ('placeholder', [function () {
      return function (img, placeholder) {
        return img && img || placeholder;
      }
    }])
    .filter ('reservationStatus', [function () {
      return function (listings, reservationStatus) {
        var filteredListings = []
        _.each (listings, function (listing) {
          if (listing && listing.reservationStatus == reservationStatus) {
            filteredListings.push (listing)
          }
        })
        return filteredListings
      }
    }]);
});
