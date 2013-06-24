var Reservation = require ('./Reservation')

var internals = {
  checkListingAvailability: function(reservation, callback) {
    Reservation.getByListingId()
  }
}

var ReservationApi = {
  addNewReservation: function (data, callback) {
    //TODO: Add data validation
    var reservation = {
      userId: data.userId,
      listId: data.listId,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      message: data.message,
      totalPrice: data.totalPrice
    }
    var model = new Reservation (reservation)
    model.save (function (err, result) {
      callback (err, result)
      //TODO: Send an email to the owner
    })
  },
  updateReservationById: function (id, pickupDate, returnDate, message, totalPrice, callback) {
    //TODO: Add data validation
    Reservation.findById (id, function (error, model) {
      if (! error) {
        model.userId = userId
        model.listId = listId
        model.pickupDate = pickupDate
        model.returnDate = returnDate
        model.message = message
        model.totalPrice = totalPrice
        model.save (function (err, result) {
          callback (err, result)
          //TODO: Send an email to the owner
        })
      } else {
        callback (error)
      }
    })
  },
  removeReservationById: function (id, callback) {
    Reservation.findById (id, function (error, model) {
      if (! error) {
        model.remove (function (err, result) {
          callback (err, result)
        })
      } else {
        callback (error)
      }
    })
  },
  findReservationsByUserId: function (userId, callback) {
    //TODO: Filter the id
    var query = Reservation.find (
      {
        userId: userId
      })
    query.exec (function (err, reservations) {
      callback (err, reservations)
    })
  },
  findReservationsByListingId: function (listingId, callback) {
    //TODO: Filter the id
    var query = Reservation.find (
      {
        listingId: listingId
      })
    query.exec (function (err, reservations) {
      callback (err, reservations)
    })
  }
}

var externals = {
  reserve: {
    params: {

    },
    func: function (reservation, callback) {
      internals.checkListingAvailability(reservation, function(listing, reservation) {
        callback(null, listing, reservation)
      })
    }
  },
  release: {
    params: {

    },
    func: function (reservation, callback) {
      callback(null, listing, reservation)
    }
  }
}

module.exports = externals