var routes = require('../routes'),
  prefix = '/listing/',
  listingAPI = require('./api')

module.exports = routes(prefix, listingAPI)