var routes = require('../../routes'),
  api = require('./api'),
  prefix = '/balanced/creditCard/',
  ep = routes(prefix, api)
module.export = ep