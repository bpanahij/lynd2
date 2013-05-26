var mongoose = require ( 'mongoose' );
var UserBankAccountProfileSchema = new mongoose.Schema (
  {
    userId: {
      type: Number,
      required: true
    },
    eBankAccountsUri: String,
    cardsUri: String,
    createdAt: String,
    debitsUri: String,
    emailAddress: String,
    holdsUri: String,
    id: String,
    meta: String,
    name: String,
    refundsUri: String,
    roles: String,
    transactionsUri: String,
    uri: String
  }
);
module.exports = mongoose.model ( "UserBankAccountProfile", UserBankAccountProfileSchema );