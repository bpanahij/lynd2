var async = require('async')
var HttpServer = require('./httpServer')
var SocketServer = require('./socketServer')

//var dummyListingsRoute = require('./routes/dummyListingsRoute')
//var listingsRoute = require('./routes/listingsRoute')
//var singlyRoutes = require('./routes/singlyRoutes')
//var balancedRoute = require('./routes/balancedRoute')
//var bankAccountRoute = require('./routes/bankAccountRoute')
//var userProfileRoutes = require('./routes/userProfileRoutes')
//var betaSignupRoute = require('./routes/betaSignupRoute')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lynd')

async.series([
  function (callback) {
    var httpServer = HttpServer();//[singlyRoutes])
    httpServer.initialize(function() {
      console.log('http...initialized')
      callback();
    })
  },
  function (callback) {
    var socketServer = SocketServer();//[listingsRoute, dummyListingsRoute, singlyRoutes, balancedRoute, userProfileRoutes, betaSignupRoute, bankAccountRoute])
    socketServer.initialize(function() {
      console.log('socket...initialized')
      callback();
    })
  }
], function(err) {
  console.log('done', err)
})