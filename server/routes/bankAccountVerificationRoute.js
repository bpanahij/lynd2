var BankaccountverificationApi = require('../api/bankAccountApi');

var bankAccountVerificationRoute = {
	setup: function (socket) {
		socket.on('getBankAccountVerificationById', function (data) {
			BankaccountverificationApi.getBankAccountVerificationById(data.id, function(error, result) {
				if (error){
					socket.emit('getBankAccountVerificationByIdError', error);
				}else{
					socket.emit("getBankAccountVerificationByIdReponse", result);
				}
			});
		});
		socket.on('updateBankAccountVerificationById', function (data) {
			BankaccountverificationApi.updateBankAccountVerificationById(data.id, function(error, result) {
				if (error){
					socket.emit('updateBankAccountVerificationByIdError', error);
				}else{
					socket.emit("updateBankAccountVerificationByIdResponse", result);
				}
			});
		});
		socket.on('removeBankAccountVerificationById', function (data) {
			BankaccountverificationApi.removeBankAccountVerificationById(data.id, function(error, result) {
				if (error){
					socket.emit('removeBankAccountVerificationByIdError', error);
				}else{
					socket.emit("removeBankAccountVerificationByIdResponse", result);
				}
			});
		});
		socket.on('addBankAccountVerification', function (data) {
			BankaccountverificationApi.addBankAccountVerification(data, function(error, result) {
				if (error){
					socket.emit('addBankAccountVerificationError', error);
				}else{
					socket.emit("addBankAccountVerificationResponse", result);
				}
			});
		});
	}
};

module.exports = bankAccountVerificationRoute;
