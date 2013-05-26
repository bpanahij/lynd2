var UserBankAccountProfileApi = require('../api/userBankAccountProfileApi');

var userBankAccountProfileRoute = {
	setup: function (socket) {
		socket.on('getUserBankAccountProfileById', function (data) {
			UserBankAccountProfileApi.getUserBankAccountProfileById(data.id, function(error, result) {
				if (error){
					socket.emit('getUserBankAccountProfileByIdError', error);
				}else{
					socket.emit("getUserBankAccountProfileByIdReponse", result);
				}
			});
		});
		socket.on('updateUserBankAccountProfileById', function (data) {
			UserBankAccountProfileApi.updateUserBankAccountProfileById(data.id, function(error, result) {
				if (error){
					socket.emit('updateUserBankAccountProfileByIdError', error);
				}else{
					socket.emit("updateUserBankAccountProfileByIdResponse", result);
				}
			});
		});
		socket.on('removeUserBankAccountProfileById', function (data) {
			UserBankAccountProfileApi.removeUserBankAccountProfileById(data.id, function(error, result) {
				if (error){
					socket.emit('removeUserBankAccountProfileByIdError', error);
				}else{
					socket.emit("removeUserBankAccountProfileByIdResponse", result);
				}
			});
		});
		socket.on('addUserBankAccountProfile', function (data) {
			UserBankAccountProfileApi.addUserBankAccountProfile(data, function(error, result) {
				if (error){
					socket.emit('addUserBankAccountProfileError', error);
				}else{
					socket.emit("addUserBankAccountProfileResponse", result);
				}
			});
		});
	}
};

module.exports = userBankAccountProfileRoute;
