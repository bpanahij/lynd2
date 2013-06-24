var routes = require ('../routes'),
  prefix = '/user/',
  profileAPI = require ('./api')

module.exports = routes (prefix, profileAPI)