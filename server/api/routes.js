var _ = require('underscore')
module.exports = function (apis) {
  return {
    setupSocket: function (socket) {
      _.each (apis, function (func, funcName) {
        socket.on (funcName, function (data) {
          apis[funcName].func (data, function (err, result) {
            if (err) {
              socket.emit (funcName + 'Error', err)
            }
            socket.emit (funcName + 'Success', result)
          })
        })
      })
    }
  }
}

function validateData(data, params) {
  _.each(params, function(param) {

  })
}