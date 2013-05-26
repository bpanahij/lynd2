var mongoose = require ( 'mongoose' );
var CreditCardSchema = new mongoose.Schema (
  {
    userId: {
      type: Number,
      required: true
    },
    expirationMonth: Number,
    hash: String,
    expirationYear: String,
    createdAt: String,
    id: String,
    uri: String,
    cardType: String,
    isValid: Boolean,
    lastFour: String,
    canDebit: Boolean,
    brand: String
  }
);
module.exports = mongoose.model ( "CreditCard", CreditCardSchema );