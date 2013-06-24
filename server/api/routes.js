var _ = require('underscore')
module.exports = function (dir, apis) {
  return {
    setupSocket: function (socket) {
      _.each (apis, function (func, funcName) {
        socket.on (dir + funcName, function (data) {
          apis[funcName].func (data, function (err, result) {
            if (err) {
              socket.emit (dir + funcName + 'Error', err)
            }
            socket.emit (dir + funcName + 'Success', result)
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