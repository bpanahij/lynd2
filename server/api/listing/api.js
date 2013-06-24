var geohashUtil = require ('./util/geohashUtil'),
  geocodeUtil = require ('./util/geocodeUtil'),
  Listing = require ('./Listing'),
  _ = require ('underscore'),
  routes = require ('../routes')

var internals = {
  /**
   *
   * @param data: {}
   * @param callback
   */
  add: {
    params: {

    },
    func: function (data, callback) {
      var listing = {};
      _.extend (listing, data);
      listing.geoHash = geohashUtil.hashGeocode (data.geoCode);
      var model = new Listing (listing);
      model.save (function (err, result) {
        callback (err, result);
      })
    }
  },
  getById: {
    params: {

    },
    func: function (data, callback) {
      Listing.findById (data._id, function (error, model) {
        var distanceFromTarget = geocodeUtil.distanceBetweenTwoGeocodes (data.geoCode, model.geoCode)
        model.distanceFromUser = distanceFromTarget;
        callback (null, model)
      })
    }
  },
  /**
   *
   * @param {{lat: number, long: number}} targetGeocode
   * @param {number} distanceInMiles
   * @param {function(Error, Array.<Listing>} callback
   */
  getByDistance: {
    params: {

    },
    func: function (data, callback) {
      var numberGeohashBlocks = Math.ceil (data.distance)
      var geoHashArray = geohashUtil.getHashesFromGeocodeInBlockRadius (data.geoCode, numberGeohashBlocks)
      var matchingListings = []
      var numberComplete = 0
      geoHashArray.forEach (function (geoHash) {
        internals.getByGeohash.func (geoHash, function (err, listings) {
          if (listings && listings.length > 0) {
            listings.forEach (function (listing) {
              var distanceFromTarget = geocodeUtil.distanceBetweenTwoGeocodes (data.geoCode, listing.geoCode)
              if (distanceFromTarget <= data.distance) {
                listing.distanceFromUser = distanceFromTarget
                matchingListings.push (listing)
              }
            })
          }
          numberComplete ++
          if (numberComplete === geoHashArray.length) {
            callback (err, matchingListings)
          }
        });
      });
    }
  },
  /**
   *
   * @param geohash
   * @param callback
   */
  getByGeohash: {
    params: {

    },
    func: function (geoHash, callback) {
      var query = Listing.find ({geoHash: geoHash})
      query.exec (function (err, listings) {
        callback (err, listings)
      })
    }
  },
  /**
   *
   * @param callback
   */
  getAllListings: {
    params: {

    },
    func: function (callback) {
      var query = Listing.find ()
      query.exec (function (err, listings) {
        callback (err, listings)
      });
    }
  },
  /**
   *
   * @param userId
   * @param callback
   */
  getByUserId: {
    params: {

    },
    func: function (data, callback) {
      var query = Listing.find ({userId: data.userId})
      query.exec (function (err, listings) {
        callback (err, listings)
      });
    }
  },
  /**
   *
   * @param data
   * @param callback
   */
  updateById: {
    params: {

    },
    func: function (data, callback) {
      Listing.findById (data._id, function (err, model) {
        _.extend (model, data)
        model.geohash = geohashUtil.hashGeocode ({lat: data.geoCode.lat, long: data.geoCode.long})
        model.save (function (err, result) {
          callback (err, result)
        })
      });
    }
  },
  /**
   *
   * @param data
   * @param callback
   */
  removeById: {
    params: {

    },
    func: function (data, callback) {
      Listing.findById (data._id, function (error, model) {
        model.remove (function (err, result) {
          callback (err, result)
        })
      })
    }
  }
}
module.exports = internals