var MarketplaceaccountApi = require('../api/marketPlaceAccountApi');

var marketPlaceAccountRoute = {
	setup: function (socket) {
		socket.on('getMarketPlaceAccountById', function (data) {
			MarketplaceaccountApi.getMarketPlaceAccountById(data.id, function(error, result) {
				if (error){
					socket.emit('getMarketPlaceAccountByIdError', error);
				}else{
					socket.emit("getMarketPlaceAccountByIdReponse", result);
				}
			});
		});
		socket.on('updateMarketPlaceAccountById', function (data) {
			MarketplaceaccountApi.updateMarketPlaceAccountById(data.id, function(error, result) {
				if (error){
					socket.emit('updateMarketPlaceAccountByIdError', error);
				}else{
					socket.emit("updateMarketPlaceAccountByIdResponse", result);
				}
			});
		});
		socket.on('removeMarketPlaceAccountById', function (data) {
			MarketplaceaccountApi.removeMarketPlaceAccountById(data.id, function(error, result) {
				if (error){
					socket.emit('removeMarketPlaceAccountByIdError', error);
				}else{
					socket.emit("removeMarketPlaceAccountByIdResponse", result);
				}
			});
		});
		socket.on('addMarketPlaceAccount', function (data) {
			MarketplaceaccountApi.addMarketPlaceAccount(data, function(error, result) {
				if (error){
					socket.emit('addMarketPlaceAccountError', error);
				}else{
					socket.emit("addMarketPlaceAccountResponse", result);
				}
			});
		});
	}
};

module.exports = marketPlaceAccountRoute;
