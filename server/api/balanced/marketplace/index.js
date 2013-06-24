var routes = require('../../routes'),
  api = require('./api'),
  prefix = '/balanced/marketplace/',
  ep = routes(prefix, api)
module.export = ep