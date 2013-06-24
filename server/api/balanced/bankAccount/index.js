var routes = require('../../routes'),
  api = require('./api'),
  prefix = '/balanced/bankAccount/',
  ep = routes(prefix, api)
module.export = ep