var restful = require ('../../../restful'),
  config = require ('../../../../config'),
  username = config.current ().balanced.username,
  password = config.current ().balanced.password,
  auth = "Basic " + new Buffer (username + ":" + password).toString ("base64")

var any = /.*/
var internals = {
  new: {
    fields: {
      required: {
        method: /POST/,
        verificationsUri: any
      },
      optional: {}
    },
    postData: function (data) {
      return {}
    },
    postOptions: function (data) {
      return {
        method: 'POST',
        path: data.verificationsUri
      }
    }
  },
  get: {
    fields: {
      required: {
        method: /GET/,
        verificationsUri: any
      },
      optional: {}
    },
    postOptions: function (data) {
      return {
        method: 'GET',
        path: data.verificationsUri
      }
    },
    postData: function (data) {
      return {}
    }
  },
  verify: {
    fields: {
      required: {
        method: /PUT/,
        amountOne: any,
        amountTwo: any,
        verificationsUri: any
      },
      optional: {}
    },
    postData: function (data) {
      return {
        amount_1: data.amountOne,
        amount_2: data.amountTwo
      }
    },
    postOptions: function (data) {
      return {
        method: 'PUT',
        path: data.verificationsUri + '?amount_one=' + data.amountOne + '&amount_two=' + data.amountTwo
      }
    }
  }
}

module.exports = restful.routify(internals)