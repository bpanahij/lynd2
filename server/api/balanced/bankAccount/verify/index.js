var routes = require('../../../routes'),
  api = require('./api'),
  prefix = '/balanced/bankAccount/verify/',
  ep = routes(prefix, api)
module.export = ep