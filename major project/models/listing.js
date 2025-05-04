const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    description: String,
    image:{
        filename: String,
        url: {
            type: String,
            default: "https://demo-source.imgix.net/canyon.jpg",
        set: (v) => 
            v === "" 
                ? "https://demo-source.imgix.net/canyon.jpg"
                : v,
        }, 
    },
    price: Number,
    location: String,
    country: String,
});


//creating model using listingSchema
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;