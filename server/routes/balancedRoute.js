var balanced = require ('../api/BalancedApi'),
  bankAccountApi = require ('../api/BankAccountApi'),
  bankAccountVerificationApi = require ('../api/BankAccountVerificationApi')

var _ = require ('underscore'),
  async = require ('async')

module.exports = {
  setupSocket: function (socket) {
    socket.on ('CreateBankAccount', function (data) {
      balanced.CreateBankAccount (data, function (error, response) {
        var jsonBA = JSON.parse (response)
        if (jsonBA.status_code == 201 || ! jsonBA.status_code) {
          jsonBA.user_id = data.user_id
          bankAccountApi.addBankAccount (jsonBA, function (error, response) {
            socket.emit ('CreateBankAccountResponse', { message: 'success' })
          })
        } else {
          socket.emit ('CreateBankAccountError', { error: jsonBA.description })
        }
      })
    })
    socket.on ('VerifyBankAccount', function (data) {
      bankAccountApi.getBankAccountByUserId (data.user_id, function (err, bankAccount) {
        var options = {verifications_uri: bankAccount.verifications_uri}
        balanced.VerifyBankAccount (options, function (error, response) {
          var jsonBAV = JSON.parse (response)
          jsonBAV.bank_uri = bankAccount.verifications_uri
          jsonBAV.user_id = data.user_id
          bankAccountVerificationApi.addBankAccountVerification (jsonBAV, function (error, verify) {
            socket.emit ('VerifyBankAccountResponse', { message: 'success', verify: verify })
          })
        })
      })
    })
    socket.on ('DeleteBankAccount', function (data) {
      balanced.DeleteBankAccount (data, function (error, result) {
        socket.emit ('DeleteBankAccountResponse')
      })
    })
    socket.on ('ConfirmBankAccountVerification', function (data) {
      bankAccountVerificationApi.getBankAccountVerificationByUserId (data, function (err, result) {
        if (_.isEmpty (result)) {
          socket.emit ('ConfirmBankAccountVerificationMissingResponse')
          return
        }
        _.extend (data, result.toObject ())
        data.uri = data.bank_uri
        balanced.ConfirmBankAccountVerification (data, function (error, response) {
          async.series ([
            function (callback) {
              if (response.state === 'verified') {
                callback (null, response)
              }
              else {
                balanced.RetrieveBankAccountVerification (data, function (err, response) {
                  var verification = JSON.parse (response)
                  response = verification.items[0]
                  callback (null, response)
                })
              }
            }],
            function (err, result) {
              bankAccountApi.getBankAccountByUserId (data.user_id, function (err, bankAccount) {
                bankAccount.verified = true
                bankAccount.save (function (err) {
                  if (err) {
                    socket.emit ('ConfirmBankAccountVerificationError', err)
                  }
                  socket.emit ('ConfirmBankAccountVerificationResponse', bankAccount)
                })
              })
            })
        })
      })
    })
  }
}