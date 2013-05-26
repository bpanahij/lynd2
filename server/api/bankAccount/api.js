var BankAccount = require ('./BankAccount'),
  BankAccountVerification = require ('./BankAccountVerification')
var api = {
  GET: function (data, callback) {
    if (_.has (data, '_id')) {
      internals.getById (data, callback)
      return
    }
    if (_.has (data, 'userId')) {
      internals.getByUserId (data, callback)
      return
    }
  },
  POST: function (data, callback) {
    internals.add (data, callback)
  },
  PUT: function (data, callback) {
    internals.updateById (data, callback)
  },
  DELETE: function (data, callback) {
    internals.removeById (data, callback)
  }
}
var internals = {
  getById: function (data, callback) {
    BankAccount.findById (data._id, function (err, result) {
      callback (err, result)
    });
  },
  getByUserId: function (data, callback) {
    BankAccount.find ({userId: data.userId}).lean ().exec (function (err, result) {
      callback (err, result)
    });
  },
  add: function (data, callback) {
    var model = new BankAccount (data);
    model.save (function (err, result) {
      callback (err, result)
    })
  },
  updateById: function (data, callback) {
    BankAccount.findById (data._id, function (err, model) {
      _.extend (model, data)
      model.save (function (err, result) {
        callback (err, result)
      })
    })
  },
  removeById: function (data, callback) {
    BankAccount.findById (data._id, function (err, model) {
      model.remove (function (err, result) {
        callback (err, result)
      })
    })
  }
}
module.exports = api