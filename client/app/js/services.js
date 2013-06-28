//define ([], function () {
'use strict'

function read_cookie (key) {
  var result
  return (result = new RegExp ('(?:^|; )' + encodeURIComponent (key) + '=([^;]*)').exec (document.cookie)) ? (result[1]) : null
}

function set_cookie (c_name, value, exdays) {
  var exdate = new Date ();
  exdate.setDate (exdate.getDate () + exdays);
  var c_value = escape (value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString ());
  document.cookie = c_name + "=" + c_value;
}

var userStore = {
  users: {}
}  // Cache userInfo when requests are responded to
var listingCache = {}
var myUserProfile = {}
var marketplaceStore = {}

angular.module ('Lynd.services', [])
  .factory ('listings', ['socketio', 'user', function (socketio, user) {
    var listings = {
      getByDistance: function (useCache, geoCode, distance, callback) {
        if (useCache) {
          return listingCache.searchResults
        }
        socketio.server ('/listing/getByDistance', {
          geoCode: geoCode,
          distance: distance
        }, function (err, listings) {
          callback (listings)
          listingCache.searchResults = listings
        })
      },
      add: function (listing, callback) {
        socketio.server ('/listing/add', listing, function (err, listing) {
          callback (listing)
        })
      },
      update: function (listing, callback) {
        socketio.server ('/listing/updateById', listing, function (err, listing) {
          callback (listing)
        })
      },
      remove: function (listing, callback) {
        socketio.server ('/listing/removeById', listing, function (listing) {
          callback (listing)
        })
      },
      reserve: function (reservation, listing, callback) {
        user.get (true, function (err, userInfo) {
          _.extend (reservation, userInfo, listing)
          socketio.server ('/listing/reserve', reservation, function (err, reservation) {
            callback (reservation)
          })
        })
      },
      release: function (reservation, listing, callback) {
        user.get (true, function (err, userInfo) {
          _.extend (reservation, userInfo, listing)
          socketio.server ('/listing/releaseSuccess', reservation, function (err, reservation) {
            callback (listing, reservation)
          })
        })
      },
      getByUserId: function (userCache, userId, callback) {
        if (userCache) {
          return listingCache.listingsByUserId
        }
        socketio.server ('/listing/getByUserId', {
          userId: userId
        }, function (err, listings) {
          callback (listings)
          listingCache.listingsByUserId = listings
        })
      },
      getById: function (userCache, listingId, geoCode, callback) {
        if (userCache) {
          return listingCache.singleListing
        }
        var data = {
          geoCode: geoCode,
          _id: listingId
        }
        socketio.server ('/listing/getById', data, function (err, listing) {
          callback (listing)
          listingCache.singleListing = listing
        })
      }
    }
    return listings
  }])
  .factory ('facebook', ['user', function (user) {
    var facebook = {
      isLoggedIn: function (callback) {
        if (! fbisLoaded) {
          return null
        }
        return read_cookie ('user_id')
      },

      loginWithFacebook: function (callback) {
        facebook.getFacebookAuth (function (err, response) {
          facebook.getFacebookProfile (function (err, fbProfile) {
            set_cookie ('user_id', fbProfile.id, 30)
            user.getUserProfileByFacebookId (false, function (userProfileErr, userProfile) {
              if (userProfileErr) {
                var newUserProfile = facebook.convertFacebookProfile (fbProfile, response.authResponse)
                user.addNewUserProfile (newUserProfile, function (err, createdUserProfile) {
                  callback (null, createdUserProfile)
                })
              }
              callback (null, userProfile)
            })
          })
        })
      },

      setAuthCookies: function (userProfile) {
        set_cookie ('user_id', userProfile._id)
        set_cookie ('username', userProfile.username)
      },

      getFacebookProfile: function (callback) {
        FB.api ('/me', function (facebookProfile) {
          callback (null, facebookProfile)
        })
      },
      getFacebookAuth: function (callback) {
        FB.login (function (response) {
          if (response.authResponse) {
            callback (null, response)
          } else {
            callback (new Error ('not authorized'), response)
          }
        }, {
          scope: 'email,user_likes'
        })
      },

      mockLoginFacebook: function (callback) {
        set_cookie ('user_id', '1234567')
        set_cookie ('auth_token', 'qsfadfsadfuasdf9wut9qwr9qwefqw')
        set_cookie ('username', 'bpanahij')
        callback ()
      },

      convertFacebookProfile: function (fb, auth) {
        var userProfile = {
          id: fb.id,
          username: fb.username,
          fullName: fb.name,
          firstName: fb.first_name,
          lastName: fb.last_name,
          link: fb.link,
          local: fb.locale,
          timezone: fb.timezone,
          facebook_id: fb.id,
          gender: fb.gender,
          password: '',
          email: fb.email,
          phone: '',
          image: 'https://graph.facebook.com/' + fb.username + '/picture?type=large',
          about: '',
          location: fb.location && fb.location.name,
          token: auth ? auth.accessToken : null,
          balancedMarketplaceURIHash: null
        }
        return userProfile
      }
    }
    return facebook
  }])
  .factory ('sidemenu', [function () {
    var sideMenu = {
      $body: null,
      $showLeftPush: null,
      $menuLeft: null,
      toggleMenu: function () {
        sideMenu.$body.toggleClass ('cbp-spmenu-push-toright');
        sideMenu.$menuLeft.toggleClass ('cbp-spmenu-open');
      },
      invoke: function () {
        sideMenu.$menuLeft = angular.element (leftMenu)
        sideMenu.$showLeftPush = angular.element (menuButton)
        sideMenu.$body = angular.element (body);
        sideMenu.$showLeftPush.bind ('click', sideMenu.toggleMenu);
      }
    }
    return sideMenu;
  }])
  .factory ('auth', ['user', 'facebook', function (user, facebook) {
    return {
      getUser: function (callback) {
        user.getUserProfileByFacebookId (true, function (err, userProfile) {
          if (userProfile) {
            callback (null, userProfile);
            return
          }
          facebook.loginWithFacebook (callback)
        })
      }
    }
  }])
  .factory ('user', ['socketio', function (socketio) {
    var userService = {
      addToUserStore: function (key, store) {
        userStore[key] = store
      },
      getFromUserStore: function (key) {
        return userStore[key]
      },
      isUserRegistered: function () {
        return read_cookie ('user_id')
      },
      getCachedUser: function () {
        return userStore.users[read_cookie ('user_id')]
      },
      setCachedUser: function (profile) {
        userStore.users[read_cookie ('user_id')] = profile
      },
      getUserProfileByFacebookId: function (fromCache, callback) {
        var facebookId = read_cookie ('user_id')
        // Get userInfo from cache
        if (fromCache && ! _.isEmpty (userStore.users[facebookId])) {
          callback (null, userStore.users[facebookId])
        }
        socketio.server ('/user/getUserProfileByFacebookId', {facebookId: facebookId}, function (err, user) {
          if (user) {
            userStore.users[user.facebookId] = user
            callback (null, user)
          } else {
            callback (new Error ('No User By That Id'), null)
          }
        })
      },
      saveCachedUserProfile: function (callback) {
        var profile = userStore.users[read_cookie ('user_id')]
        socketio.server ('/user/updateUserProfileById', profile, function (err, updatedProfile) {
          userStore.users[updatedProfile._id] = updatedProfile
          callback (null, updatedProfile)
        })
      },
      addNewUserProfile: function (userObj, callback) {
        socketio.server ('/user/addNewUserProfile', userObj, function (err, user) {
          userStore.users[user._id] = user
          callback (null, user)
        })
      }
    }
    return userService;
  }])
  .factory ('balanced', ['socketio', 'user', function (socketio, user) {
    var balanced = {
      get: function (fromCache, callback) {
        if (fromCache) { // Get marketplace from cache
          callback (null, marketplaceStore)
        }
        user.get (true, function (err, userInfo) {
          socketio.server ('/balanced/marketplace/get', userInfo, function (marketplace) {
            marketplaceStore.marketplace = marketplace
            async.parallel ({
              bankAccount: function (callback) {
                socketio.server ('/balanced/bankAccount/get', marketplace, function (bankAccount) {
                  callback (null, bankAccount)
                })
              },
              creditCard: function (callback) {
                socketio.server ('/balanced/creditCard/get', marketplace, function (creditCard) {
                  callback (null, creditCard)
                })
              }
            }, function (results) {
              marketplaceStore.bankAccount = results.bankAccount
              marketplaceStore.creditCard = results.creditCard
              callback (null, marketplaceStore)
            })
          })
        })
      },
      saveBank: function (bankAccountInfo, callback) {
        user.get (true, function (err, userInfo) {
          _.extend (bankAccountInfo, userInfo)
          socketio.server ('/balanced/bankAccount/save', bankAccountInfo, function (bankAccount) {
            marketplaceStore.bankAccount = bankAccount
            callback (null, marketplaceStore.bankAccount)
          })
        })
      },
      saveCreditCard: function (creditCardInfo, callback) {
        user.get (true, function (err, userInfo) {
          _.extend (creditCardInfo, userInfo)
          socketio.server ('/balanced/creditCard/save', creditCardInfo, function (creditCard) {
            marketplaceStore.creditCard = creditCard
            callback (null, marketplaceStore.creditCard)
          })
        })
      },
      updateBank: function (bankAccountInfo, callback) {
        user.get (true, function (err, userInfo) {
          _.extend (bankAccountInfo, userInfo)
          socketio.server ('/balanced/bankAccount/update', bankAccountInfo, function (bankAccount) {
            marketplaceStore.creditCard = creditCard
            callback (null, marketplaceStore.creditCard)
          })
        })
      }
    }
    return balanced
  }])
  .factory ('socketio', [function () {
    var socket = io.connect (socketHost);
    socket.server = function (url, data, callback) {
      this.on (url + 'Success', function (response) {
        callback (null, response)
      })
      this.on (url + 'Error', function (response) {
        callback (new Error ('Socket Based Service Error'), response)
      })
      this.emit (url, data, callback);
    }
    return socket;
  }])
  .factory ('geocoder', [function () {
    function GEO () {
      if (! switches.geocode) {
        return {
          reverse: function (long, lat, callback) {
            callback (null, ['San Francisco, Ca'])
          },
          forward: function (address, callback) {
            callback (null, [
              {
                lat: 0,
                long: 0
              }
            ])
          },
          getCurLocation: function (callback) {
            callback (null, {
              geocode: {
                lat: 0,
                long: 0
              },
              addresses: ['San Francisco, Ca']
            })
          }
        }
      }
      this.reverse = function (lat, long, callback) {
        var geocoder = new google.maps.Geocoder ()
        var latLng = new google.maps.LatLng (lat, long);
        geocoder.geocode ({latLng: latLng}, function (results, status) {
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
        geocoder.geocode ({address: address}, function (results, status) {
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
  }])
  .factory ('filepicker', ['async', function (async) {
    var filePicker = {
      uploadMultiple: function (width, height, progressCallback, callback) {
        var photos = []
        var resizeImage = function (image, callback) {
          filepicker.convert (image, {
              width: width,
              height: height,
              fit: 'max'
            },
            function (resizedImage) {
              callback (null, resizedImage)
            }
          )
        }
        var storeImage = function (image, callback) {
          filepicker.store (image, function (FPFile) {
            callback (null, FPFile.url)
          }, function (FPError) {
            callback (FPError, photos)
          }, function (progress) {
            progressCallback (progress)
          })
        }
        var resizeAndStoreImage = function (image, callback) {
          resizeImage (image, function (err, resizedImage) {
            storeImage (resizedImage, callback)
          })
        }
        filepicker.setKey ('AkKd1EC5mTSiABybvVCKjz')
        filepicker.pickMultiple (function (images) {
          async.map (images, resizeAndStoreImage, function (err, storedImages) {
            callback (null, storedImages)
          })
        })
      }
    }
    return filePicker
  }])
  .factory ('googleAnalytics', [function () {
    return {
      listenTrack: function ($scope, $window) {
        $scope.$on ('$viewContentLoaded', function (event) {
          $window._gaq.push (['_trackPageview', $location.path ()]);
        });
      }
    }
  }])
  .factory ('async', function () {
  return window.async;
});
//})