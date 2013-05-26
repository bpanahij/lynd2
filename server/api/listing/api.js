var geohashUtil = require ('./util/geohashUtil'),
  geocodeUtil = require ('./util/geocodeUtil'),
  Listing = require ('./Listing'),
  _ = require ('underscore')
var api = {
  GET: function (data, callback) {
    if (_.has (data, 'distance') && _.has (data, 'target')) {
      internals.findByDistance (data, callback)
      return
    }
    if (_.has (data, '_id')) {
      internals.findById (data, callback)
      return
    }
    if (_.has (data, 'geohash')) {
      internals.findByGeohash (data, callback)
      return
    }
    if (_.has (data, 'userId')) {
      internals.findById (data, callback)
      return
    }
    internals.findAllListings (callback)
  },
  POST: function (data, callback) {
    internals.add (data, callback)
  },
  PUT: function (data, callback) {
    if (_.has (data, '_id')) {
      internals.updateById (data, callback)
      return
    }
    callback (Error ('Missing id'))
  },
  DELETE: function (data, callback) {
    if (_.has (data, '_id')) {
      internals.removeById (data, callback)
      return
    }
    callback (Error ('Missing id'))
  }
}
var internals = {
  /**
   *
   * @param data: {}
   * @param callback
   */
  add: function (data, callback) {
    var listing = {}
    _.extend (listing, data)
    listing.geohash = geohashUtil.hashGeocode ({lat: data.geocode.lat, long: data.geocode.long})
    listing.image = _.isUndefined (data.image) ? '' : data.image
    var model = new Listing (listing)
    model.save (function (err, result) {
      callback (err, result)
    })
  },
  findById: function (data, callback) {
    Listing.findById (data._id, function (error, model) {
      var distanceFromTarget = geocodeUtil.distanceBetweenTwoGeocodes (data.targetGeocode, model.geocode)
      model.distanceFromUser = distanceFromTarget
      callback (null, model)
    })
  },
  /**
   *
   * @param {{lat: number, long: number}} targetGeocode
   * @param {number} distanceInMiles
   * @param {function(Error, Array.<Listing>} callback
   */
  findByDistance: function (data, callback) {
    var numberGeohashBlocks = Math.ceil (data.distanceInMiles)
    var geohashArray = geohashUtil.getHashesFromGeocodeInBlockRadius (data.targetGeocode, numberGeohashBlocks)
    var matchingListings = []
    var numberComplete = 0
    geohashArray.forEach (function (geohash) {
      api.getListingsByGeohash (geohash, function (err, listings) {
        if (listings && listings.length > 0) {
          listings.forEach (function (listing) {
            var distanceFromTarget = geocodeUtil.distanceBetweenTwoGeocodes (data.targetGeocode, listing.geocode)
            if (distanceFromTarget <= data.distanceInMiles) {
              listing.distanceFromUser = distanceFromTarget
              matchingListings.push (listing)
            }
          })
        }
        numberComplete ++
        if (numberComplete === geohashArray.length) {
          callback (err, matchingListings)
        }
      });
    });
  },
  /**
   *
   * @param geohash
   * @param callback
   */
  findByGeohash: function (data, callback) {
    var query = Listing.find ({geohash: data.geohash})
    query.exec (function (err, listings) {
      callback (err, listings)
    })
  },
  /**
   *
   * @param callback
   */
  findAllListings: function (callback) {
    var query = Listing.find ()
    query.exec (function (err, listings) {
      callback (err, listings)
    });
  },
  /**
   *
   * @param userId
   * @param callback
   */
  findByUserId: function (data, callback) {
    var query = Listing.find ({userId: data.userId})
    query.exec (function (err, listings) {
      callback (err, listings)
    });
  },
  /**
   *
   * @param data
   * @param callback
   */
  updateById: function (data, callback) {
    Listing.findById (data._id, function (err, model) {
      _.extend (model, data)
      model.geohash = geohashUtil.hashGeocode ({lat: data.lat, long: data.long})
      model.save (function (err, result) {
        callback (err, result)
      })
    });
  },
  /**
   *
   * @param data
   * @param callback
   */
  removeById: function (data, callback) {
    Listing.findById (data._id, function (error, model) {
      model.remove (function (err, result) {
        callback (err, result)
      })
    })
  }
}
module.exports = api