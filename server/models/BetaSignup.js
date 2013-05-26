var mongoose = require ( 'mongoose' )
var BetaSignupSchema = new mongoose.Schema (
  {
    email: String
  }
)
module.exports = mongoose.model ( "BetaSignup", BetaSignupSchema )