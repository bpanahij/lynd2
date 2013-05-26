var mongoose = require ( 'mongoose' );
var ReservationSchema = new mongoose.Schema (
  {
    userId: {
      type: Number,
      required: true
    },
    listId: Number,
    pickupDate: String,
    returnDate: String,
    message: String,
    totalPrice: String
  }
);
module.exports = mongoose.model ( "Reservation", ReservationSchema );