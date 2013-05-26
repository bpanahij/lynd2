module.exports = function (api) {
  return {
    setupSocket: function (socket) {
      _.each (api, function (func, funcName) {
        socket.on (funcName, function (data) {
          api[funcName] (data, function (err, result) {
            if (err) {
              socket.emit (funcName + 'Success', err)
            }
            socket.emit (funcName + 'Error', result)
          })
        })
      })
    }
  }
}