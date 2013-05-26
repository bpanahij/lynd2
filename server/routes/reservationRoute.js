var ReservationApi = require('../api/ReservationApi');

var reservationRoute = {
    setup: function(socket) {
        socket.on('addNewReservation', function(data) {
            ReservationApi.addNewReservation(data, function(error, result) {
                if (error) {
                    socket.emit('addNewReservationError', error);
                } else {
                    socket.emit('addNewReservationResponse', result);
                }
            });
        });
				socket.on('updateReservationById', function(data) {
            ReservationApi.updateReservationById(data, function(error, result) {
                if (error) {
                    socket.emit('updateReservationByIdError', error);
                } else {
                    socket.emit('updateReservationByIdResponse', result);
                }
            });
        });
				socket.on('removeReservationById', function(data) {
            ReservationApi.removeReservationById(data.id, function(error, result) {
                if (error) {
                    socket.emit('removeReservationByIdError', error);
                } else {
                    socket.emit('removeReservationByIdResponse', result);
                }
            });
        });
				socket.on('findReservationsByUserId', function(data) {
            ReservationApi.findReservationsByUserId(data.userId, function(error, results) {
                if (error) {
                    socket.emit('findReservationsByUserIdError', error);
                } else {
                    socket.emit('findReservationsByUserIdResponse', results);
                }
            });
        });
    }
};

module.exports = reservationRoute;
//
//var options = {userId:0,listId:0,pickupdate:"pickupdate",returndate:"returndate",message:"message",totalprice:"totalprice"};
//ReservationApi.addNewReservation(options, function(error, result) {
//	console.log("addNewReservation");
//	console.log(result);
//});
