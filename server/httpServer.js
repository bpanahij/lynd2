var _ = require('underscore')
var express = require('express')
var server = express()
var config = require('./config')

module.exports = function (routeModules) {
  this.routeModules = routeModules
  this.initialize = function (callback) {
    server.use(express.static(__dirname + '/../client'));
    server.use(express.cookieParser());
    server.set('views', __dirname + '/../client/');
    server.set('view engine', 'html');
    server.engine('html', require('hbs').__express)
    _.each(this.routeModules, function (routeModule) {
      routeModule.setupHttp(server)
    });
    var locals = {
      socketHost: (config.current().socket.host + ':' + config.current().socket.port),
      httpHost: config.current().http.host + ':' + config.current().http.port,
      development: config.development,
      facebookAppId: config.current().facebook.appId,
      switches: config.current().switches
    };
    server.get('/beta', function (req, res) {
      res.locals = locals
      res.render('newIndex')
    });
    server.get('/dev', function (req, res) {
      res.locals = locals
      res.render('index_dev')
    });
    server.get('/', function (req, res) {
      res.locals = locals
      res.render('search')
    });
    server.listen(config.current().http.port, config.current().http.host)
    callback()
  }
  return this
}