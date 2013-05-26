var mongoose = require ( 'mongoose' );

var MarketPlaceAccountSchema = new mongoose.Schema (
  {
    bankAccountsUri: String,
    cardsUri: String,
    createdAt: String,
    creditsUri: String,
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
module.exports = mongoose.model ( "MarketPlaceAccount", MarketPlaceAccountSchema );
