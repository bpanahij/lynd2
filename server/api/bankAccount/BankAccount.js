var mongoose = require ( 'mongoose' );
var BankAccountSchema = new mongoose.Schema (
  {
    userId: {
      type: String,
      required: true
    },
    creditsUri: String,
    bankName: String,
    bankCode: String,
    fingerprint: String,
    canDebit: Boolean,
    id: String,
    verifications_uri: String,
    name: String,
    createdAt: String,
    uri: String,
    meta: String,
    accountNumber: String,
    type: String,
    verified: Boolean
  }
);
module.exports = mongoose.model ( "BankAccount", BankAccountSchema );