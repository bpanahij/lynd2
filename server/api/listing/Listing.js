var mongoose = require ( 'mongoose' )
var listingSchema = new mongoose.Schema (
  {
    userId: {
      type: Number,
      required: true
    },
    boardLength: {
      feet: Number,
      inches: Number
    },
    boardType: String,
    title: String,
    location: String,
    description: String,
    images: Array,
    price: Number,
    value: Number,
    geoCode: {
      lat: Number,
      long: Number
    },
    geoHash: String
  }
);
module.exports = mongoose.model ( 'Listing', listingSchema );