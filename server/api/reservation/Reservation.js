var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
  userId: Number,
  listingId: Number,
  pickupDate: String,
  returnDate: String,
  message: String,
  totalPrice: String
});
module.exports = mongoose.model("Reservation", ReservationSchema);