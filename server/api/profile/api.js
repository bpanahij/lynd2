var Profile = require ('./Profile'),
  _ = require ('underscore')

var api = {
  GET: function (data, callback) {
    if (_.has (data, '_id')) {
      internals.getUserProfileById (data, callback)
      return
    }
    if (_.has (data, 'username')) {
      internals.getUserProfileByUsername (data, callback)
      return
    }
    if (_.has (data, 'facebookId')) {
      internals.getUserProfileByFacebookId (data, callback)
      return
    }
  },
  POST: function (data, callback) {
    internals.addNewUserProfile(data, callback)
  },
  PUT: function (data, callback) {
    if(_.has(data, '_id')) {
      internals.updateUserProfileById(data, callback)
      return
    }
    if(_.has(data, '')) {
      internals.updateUserProfileByUsername(data, callback)
      return
    }
    internals.addNewUserProfile(data, callback)
  },
  DELETE: function (data, callback) {
    //Never delete a user profile
  }
}
var internals = {
  /**
   *
   * @param id
   * @param callback
   */
  getUserProfileById: function (data, callback) {
    Profile.findById (data._id, function (err, userProfile) {
      callback (err, userProfile)
    })
  },
  /**
   *
   * @param data
   * @param callback
   */
  getUserProfileByUsername: function (data, callback) {
    Profile.findOne ({username: data.username}, function (err, userProfile, data) {
      callback (err, userProfile)
    })
  },
  /**
   *
   * @param data
   * @param callback
   */
  getUserProfileByFacebookId: function (data, callback) {
    Profile.findOne ({facebookId: data.facebookId}, function (err, userProfile, data) {
      callback (err, userProfile)
    })
  },
  /**
   *
   * @param data
   * @param callback
   */
  addNewUserProfile: function (data, callback) {
    var userProfile = {}
    _.extend (userProfile, data)
    var model = new UserProfile (userProfile)
    model.save (function (err, result) {
      callback (err, result)
    })
  },
  /**
   *
   * @param data
   * @param callback
   */
  updateUserProfileById: function (data, callback) {
    Profile.findById (data.id, function (err, model) {
      _.extend (model, data)
      model.save (function (err, result) {
        callback (err, result)
      })
    })
  },
  /**
   *
   * @param data
   * @param callback
   */
  updateUserProfileByUsername: function (data, callback) {
    Profile.findOne ({username: data.username}, function (err, model) {
      if (_.isNull (model)) {
        api.addNewUserProfile (data, callback)
        return
      }
      _.extend (model, userProfileData)
      model.save (function (err, result) {
        callback (err, result)
      })
    })
  }
}
module.exports = api