var RESTSocket = {
  namespace: null,
  init: function(namespace, success) {
    this.callbacks = {
      post: function() {},
      get: function() {},
      put: function() {},
      delete: function() {}
    }
    _.extend(callbacks, success)
    this.namespace = io.connect(socketHost + '/' + namespace)
    this.namespace.on('postCallback', function(resp) {
      this.callbacks.post(resp)
    })
    this.namespace.on('getCallback', function(resp) {
      this.callbacks.get(resp)
    })
    this.namespace.on('putCallback', function(resp) {
      this.callbacks.put(resp)
    })
    this.namespace.on('deleteCallback', function(resp) {
      this.callbacks.delete(resp)
    })
  },
  post: function (options) {
    this.namespace.emit('post', data)
  },
  get: function (options) {
    this.namespace.emit('get', data)
  },
  put: function (options) {
    this.namespace.emit('put', data)
  },
  delete: function (options) {
    this.namespace.emit('delete', data)
  }
}

var listingsApi = Object.create(RESTSocket).init({
  post: function(resp) {

  },
  get: function(resp) {

  },
  put: function(resp) {

  },
  delete: function() {

  }
});
