var CreditcardApi = require('../api/creditCardApi');

var creditCardRoute = {
	setup: function (socket) {
		socket.on('getCreditCardById', function (data) {
			CreditcardApi.getCreditCardById(data.id, function(error, result) {
				if (error){
					socket.emit('getCreditCardByIdError', error);
				}else{
					socket.emit("getCreditCardByIdReponse", result);
				}
			});
		});
		socket.on('updateCreditCardById', function (data) {
			CreditcardApi.updateCreditCardById(data.id, function(error, result) {
				if (error){
					socket.emit('updateCreditCardByIdError', error);
				}else{
					socket.emit("updateCreditCardByIdResponse", result);
				}
			});
		});
		socket.on('removeCreditCardById', function (data) {
			CreditcardApi.removeCreditCardById(data.id, function(error, result) {
				if (error){
					socket.emit('removeCreditCardByIdError', error);
				}else{
					socket.emit("removeCreditCardByIdResponse", result);
				}
			});
		});
		socket.on('addCreditCard', function (data) {
			CreditcardApi.addCreditCard(data, function(error, result) {
				if (error){
					socket.emit('addCreditCardError', error);
				}else{
					socket.emit("addCreditCardResponse", result);
				}
			});
		});
	}
};

module.exports = creditCardRoute;
