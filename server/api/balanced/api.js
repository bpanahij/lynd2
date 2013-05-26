var request = require ('request'),
  queryString = require ('queryString'),
  http = require ('https'),
  config = require ('../config'),
  username = config.current ().balanced.username,
  password = config.current ().balanced.password,
  auth = "Basic " + new Buffer (username + ":" + password).toString ("base64"),
  apiHost = config.current().balanced.host

module.exports = {
  GET: function (data, callback) {
    if (_.has (data, 'uri')) {
      internals.RetrieveBankAccount(data, callback)
      return
    }
    internals.ListAllBankAccounts (callback)
  },
  POST: function (data, callback) {
    internals.CreateBankAccount(data, callback)
  },
  PUT: function (data, callback) {

  },
  DELETE: function (data, callback) {
    if (_.has (data, 'uri')) {
      internals.DeleteBankAccount(data, callback)
      return
    }
    callback(new Error('Missing uri'))
  }
}
var internals = {
  CreateBankAccount: function (data, callback) {
    var post_data = queryString.stringify ({
      'name': data.name,
      'account_number': data.account_number,
      'routing_number': data.routing_number,
      'type': data.type
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: '/v1/bank_accounts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  RetrieveBankAccount: function (data, callback) {
    var options = {
      host: apiHost,
      port: '443',
      path: data.uri,
      headers: {'Authorization': auth}
    }
    request = http.get (options, function (res) {
      var body = ""
      res.on ('data', function (data) {
        body += data
      })
      res.on ('end', function () {
        callback (null, body)
      })
      res.on ('error', function (e) {
      })
    })
  },
  DeleteBankAccount: function (data, callback) {
    var options = {
      host: apiHost,
      port: '443',
      path: data.uri,
      method: 'DELETE',
      headers: {'Authorization': auth}
    }
    request = http.get (options, function (res) {
      var body = ""
      res.on ('data', function (data) {
        body += data
      })
      res.on ('end', function () {
        callback (null, body)
      })
      res.on ('error', function (e) {
      })
    })
  },
  ListAllBankAccounts: function (callback) {
    var options = {
      host: apiHost,
      port: '443',
      path: '/v1/bank_accounts',
      headers: {
        'Authorization': auth
      }
    }
    request = http.get (options, function (res) {
      var body = ""
      res.on ('data', function (data) {
        body += data
        console.log ('d', data)
      })
      res.on ('end', function () {
        callback (null, body)
      })
      res.on ('error', function (e) {
        callback (e, null)
      })
    })
  },
  VerifyBankAccount: function (data, callback) {
    var post_data = queryString.stringify ({
      'none': ''
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: data.verifications_uri,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  RetrieveBankAccountVerification: function (data, callback) {
    var options = {
      host: apiHost,
      port: '443',
      path: data.uri,
      headers: {'Authorization': auth}
    }
    request = http.get (options, function (res) {
      var body = ""
      res.on ('data', function (data) {
        body += data
      })
      res.on ('end', function () {
        callback (null, body)
      })
      res.on ('error', function (e) {
      })
    })
  },
  ListAccountVerifications: function (data, callback) {
    var options = {
      host: apiHost,
      port: '443',
      path: data.uri + '/verifications',
      headers: {'Authorization': auth}
    }
    request = http.get (options, function (res) {
      var body = ""
      res.on ('data', function (data) {
        body += data
      })
      res.on ('end', function () {
        callback (null, JSON.parse (body))
      })
      res.on ('error', function (e) {
      })
    })
  },
  ConfirmBankAccountVerification: function (data, callback) {
    var post_data = queryString.stringify ({
      'amount_1': data.amountOne,
      'amount_2': data.amountTwo
    })
    // An object of options to indicate where to post to
    var post_options = {
      host: apiHost,
      port: '443',
      path: data.uri + '/' + data.id + '?' + post_data,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      var body = ''
      res.on ('data', function (data) {
        body += data
      });
      res.on ('end', function () {
        callback (null, JSON.parse (body))
      })
      res.on ('error', function (e) {
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  CreateCreditCard: function (data, callback) {
    var post_data = queryString.stringify ({
      'expiration_month': data.expiration_month,
      'expiration_year': data.expiration_year,
      'security_code': data.security_code,
      'card_number': data.card_number
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: '/v1/marketplaces/' + config.current ().balanced.uri_hash + '/cards',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      })
      res.on ('error', function (e) {
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  RetrieveCreditCard: function (data, callback) {
    var options = {
      host: apiHost,
      port: '443',
      path: data.uri,
      headers: {'Authorization': auth}
    }
    request = http.get (options, function (res) {
      var body = ""
      res.on ('data', function (data) {
        body += data
      })
      res.on ('end', function () {
        callback (null, body)
      })
      res.on ('error', function (e) {
      })
    })
  },
  ListAllCards: function (callback) {
    var options = {
      host: apiHost,
      port: '443',
      path: '/v1/marketplaces/' + config.current ().balanced.uri_hash + '/cards',
      headers: {'Authorization': auth}
    }
    request = http.get (options, function (res) {
      var body = ""
      res.on ('data', function (data) {
        body += data
      })
      res.on ('end', function () {
        callback (null, body)
      })
      res.on ('error', function (e) {
      })
    })
  },
  InvalidateCard: function (data, callback) {
    var post_data = queryString.stringify ({
      'is_valid': false
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: data.uri,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  CreateMarketPlaceAccount: function (callback) {
    var post_data = queryString.stringify ({
      'none': ''
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: '/v1/marketplaces/' + config.current ().balanced.uri_hash + '/accounts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  AddCardToMarketAccount: function (data, callback) {
    var post_data = queryString.stringify ({
      'card_uri': data.card_uri
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: data.marketplace_uri,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  AddBankAccountToMarketAccount: function (data, callback) {
    var post_data = queryString.stringify ({
      'bank_account_uri': data.bank_account_uri
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: data.marketplace_uri,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  CreditBankAccount: function (data, callback) {
    var post_data = queryString.stringify ({
      'amount': data.amount
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: data.bank_credits_uri,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    };
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      })
    })
    post_req.write (post_data)
    post_req.end ()
  },
  DebitCreditCard: function (data, callback) {
    var post_data = queryString.stringify ({
      'appears_on_statement_as': 'Charge from Lynd.me',
      'amount': data.amount,
      'description': 'This is a charge from Lynd'
    })
    var post_options = {
      host: apiHost,
      port: '443',
      path: data.debits_uri,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'Authorization': auth
      }
    }
    var post_req = http.request (post_options, function (res) {
      res.setEncoding ('utf8')
      res.on ('data', function (chunk) {
        callback (null, chunk)
        return
      });
    });
    post_req.write (post_data)
    post_req.end ()
  }
}