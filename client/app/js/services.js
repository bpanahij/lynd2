define (['angular', 'socket'], function (angular, socket) {
  'use strict';

  angular.module ('Lynd.services', [])
    .factory ('sidemenu', function () {
    var sideMenu = {
      invoke: function () {
        var $menuLeft = $ ('#leftMenu');
        var $showLeftPush = $ ('#menu-button, #leftMenu a');
        var $body = $ ('body');
        var toggleMenu = function () {
          $body.toggleClass ('cbp-spmenu-push-toright');
          $menuLeft.toggleClass ('cbp-spmenu-open');
        }
        $showLeftPush.on ('click', toggleMenu);
      }
    }
    return sideMenu;
  })
    .factory ('socketio', function () {
    var socket = io.connect (socketHost);
    socket.server = function (url, data, callback) {
      this.emit (url, data, callback);
    }
    return socket;
  })
    .factory ('geocoder', function () {
    function GEO () {
      if (! switches.geocode) {
        return {
          reverse: function (long, lat, callback) {
            callback (null, ['San Francisco, Ca'])
          },
          forward: function (address, callback) {
            callback (null, [
              {lat: 0, long: 0}
            ])
          },
          getCurLocation: function (callback) {
            callback (null, {
              geocode: {lat: 0, long: 0},
              addresses: ['San Francisco, Ca']
            })
          }
        }
      }
      this.reverse = function (lat, long, callback) {
        var geocoder = new google.maps.Geocoder ()
        var latLng = new google.maps.LatLng (lat, long);
        geocoder.geocode ({ 'latLng': latLng}, function (results, status) {
          if (status != 'OK') {
            callback (null, [])
            return
          }
          var locations = []
          _.each (results, function (loc) {
            locations.push (loc.formatted_address)
          })
          callback (null, locations)
        })
      }
      this.forward = function (address, callback) {
        var geocoder = new google.maps.Geocoder ()
        geocoder.geocode ({ 'address': address}, function (results, status) {
          if (status != 'OK') {
            callback (null, [])
            return
          }

          var locations = []
          _.each (results, function (loc) {
            locations.push ({lat: loc.geometry.location.ib, long: loc.geometry.location.jb})
          })
          callback (null, results)
        })
      }
      this.getCurLocation = function (callback) {
        navigator.geolocation.getCurrentPosition (function (position) {
          var geocode = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
          this.reverse (geocode.lat, geocode.long, function (err, formattedAddresses) {
            var addressObjects = [];
            _.each (formattedAddresses, function (address) {
              addressObjects.push ({address: address});
            });
            callback (null, {
              addresses: addressObjects,
              geocode: geocode
            })
          }.bind (this))
        }.bind (this))
      }
    }

    return new GEO ()
  });
});