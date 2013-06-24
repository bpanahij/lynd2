var Profile = require ('./Profile'),
  _ = require ('underscore')

var internals = {
  /**
   *
   * @param id
   * @param callback
   */
  getUserProfileById: {
    func: function (data, callback) {
      Profile.findById (data._id, function (err, userProfile) {
        callback (err, userProfile)
      })
    }
  },
  /**
   *
   * @param data
   * @param callback
   */
  getUserProfileByUsername: { func: function (data, callback) {
    Profile.findOne ({username: data.username}, function (err, userProfile, data) {
      callback (err, userProfile)
    })
  }},
  /**
   *
   * @param data
   * @param callback
   */
  getUserProfileByFacebookId: { func: function (data, callback) {
    Profile.findOne ({facebookId: data.facebookId}, function (err, userProfile, data) {
      callback (err, userProfile)
    })
  }},
  /**
   *
   * @param data
   * @param callback
   */
  addNewUserProfile: { func: function (data, callback) {
    var userProfile = {}
    _.each(data, function(value, key, list) {
      if(key == 'link') {
        list['facebookLink'] = value
        return
      }
      key = key.replace(/_(.)/, function(char) {
        return char.replace(/_/, '').toUpperCase()
      })
      list[key] = value
    });
    _.extend (userProfile, data)
    var model = new Profile (userProfile)
    model.save (function (err, result) {
      callback (err, result)
    })
  }},
  /**
   *
   * @param data
   * @param callback
   */
  updateUserProfileById: { func: function (data, callback) {
    Profile.findById (data._id, function (err, model) {
      if (_.isEmpty(model)) {
        callback(new Error('No User'), {})
        return
      }
      _.extend (model, data)
      model.save (function (err, result) {
        callback (err, result)
      })
    })
  }},
  /**
   *
   * @param data
   * @param callback
   */
  updateUserProfileByUsername: { func: function (data, callback) {
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
  }}
}
module.exports = internals