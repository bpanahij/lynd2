var betaSignupModel = require('../models/BetaSignup')
var check = require('validator').check

var betaRoute = {
  setupSocket: function (socket) {
    socket.on('signupBeta', function (data) {
      try {
        check(data.email).len(3, 64).isEmail()
      } catch (e) {
        socket.emit('signupBetaResponse', {success: false, message: 'Invalid email. Not cool brah.'})
        return
      }
      var beta = {
        email: data.email
      }
      var model = new betaSignupModel(beta)
      model.save(function (err, result) {
        if (err) {

        } else {
          result.success = true
        }
        socket.emit('signupBetaResponse', {success: true})
      })
    });
  }
}

module.exports = betaRoute;