var routes = require ('../routes'),
  prefix = '/reservation/',
  reservationAPI = require ('./api')

module.export (routes (prefix, reservationAPI))