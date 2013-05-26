var bankAccountApi = require('../api/bankAccountApi');

var bankAccountRoute = {
  setupSocket: function (socket) {
    socket.on('getBankAccountById', function (data) {
      bankAccountApi.getBankAccountById(data.id, function (error, result) {
        if (error) {
          socket.emit('getBankAccountByIdError', error);
        } else {
          socket.emit("getBankAccountByIdReponse", result);
        }
      });
    });
    socket.on('getBankAccountsByUserId', function (data) {
      bankAccountApi.getBankAccountsByUserId(data.user_id, function (error, result) {
        if (error) {
          socket.emit('getBankAccountByUserIdError', result);
        } else {
          socket.emit("getBankAccountByUserIdResponse", result);
        }
      });
    });
    socket.on('updateBankAccountById', function (data) {
      bankAccountApi.updateBankAccountById(data.id, function (error, result) {
        if (error) {
          socket.emit('updateBankAccountByIdError', error);
        } else {
          socket.emit("updateBankAccountByIdResponse", result);
        }
      });
    });
    socket.on('removeBankAccountById', function (data) {
      bankAccountApi.removeBankAccountById(data.id, function (error, result) {
        if (error) {
          socket.emit('removeBankAccountByIdError', error);
        } else {
          socket.emit("removeBankAccountByIdResponse", result);
        }
      });
    });
    socket.on('addBankAccount', function (data) {
      bankAccountApi.addBankAccount(data, function (error, result) {
        if (error) {
          socket.emit('addBankAccountError', error);
        } else {
          socket.emit("addBankAccountResponse", result);
        }
      });
    });
  }
};

module.exports = bankAccountRoute;