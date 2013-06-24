var mongoose = require ( 'mongoose' )
var UserProfileSchema = new mongoose.Schema (
  {
    id: String,
    username: String,
    password: String,
    fullName: String,
    firstName: String,
    lastName: String,
    facebookLink: String,
    locale: String,
    timezone: Number,
    gender: String,
    facebookId: Number,
    email: String,
    phone: String,
    image: String,
    about: String,
    location: String,
    token: String,
    yearsSurfing: String,
    balancedMarketplaceURIHash: String
  }
)
module.exports = mongoose.model ( "UserProfile", UserProfileSchema )