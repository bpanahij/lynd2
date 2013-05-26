var ListingsApi = require('../api/listingsApi');

var listingRoute = {
  setupSocket: function (socket) {
    socket.on('addNewListing', function (data) {
      ListingsApi.addNewListing(data, function (error, result) {
        if (error) {
          socket.emit('addNewListingError', error);
        } else {
          socket.emit('addNewListingResponse', result);
        }
      });
    });
    socket.on('updateListingById', function (data) {
      ListingsApi.updateListingById(data, function (error, result) {
        if (error) {
          socket.emit('updateListingByIdError', error);
        } else {
          socket.emit('updateListingByIdResponse', result);
        }
      });
    });
    socket.on('removeListingById', function (data) {
      ListingsApi.removeListingById(data.id, function (error, result) {
        if (error) {
          socket.emit('removeListingByIdError', error);
        } else {
          socket.emit('removeListingByIdResponse', result);
        }
      });
    });
    socket.on('findListingsByUserId', function (data) {
      ListingsApi.findListingsByUserId(data.userId, function (error, results) {
        if (error) {
          socket.emit('findListingsByUserIdError', error);
        } else {
          socket.emit('findListingsByUserIdResponse', results);
        }
      });
    });
    socket.on('findListingById', function (data) {
      ListingsApi.findListingById(data, function (error, result) {
        if (error) {
          socket.emit('findListingByIdError', error);
        } else {
          socket.emit('findListingByIdResponse', result);
        }
      });
    });
    socket.on('findListingsNearGeocodeWithinDistance', function (data) {
      ListingsApi.findListingsNearGeocodeWithinDistance(data.geocode, data.distance, function (error, results) {
        if (error) {
          socket.emit('findListingsNearGeocodeWithinDistanceError', error);
        } else {
          socket.emit('findListingsNearGeocodeWithinDistanceResponse', results);
        }
      });
    });
  }
};

module.exports = listingRoute;
