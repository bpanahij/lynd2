var mongoose = require ( 'mongoose' );
var BankAccountVerificationSchema = new mongoose.Schema (
  {
    userId: {
      type: String,
      required: true
    },
    bankUri: {
      type: String,
      required: true
    },
    attempts: Number,
    id: String,
    remainingAttempts: Number,
    state: String,
    uri: String
  }
)
module.exports = mongoose.model ( "BankAccountVerification", BankAccountVerificationSchema );