// const mongoose = require('mongoose');
import mongoose, { Model } from "mongoose";

//const schema = mongoose.schema;

const destinationSchema = new mongoose.Schema({

    destination : {
        type : String,
        required : true 
    },
    description : {
        type : String,
        required : true
    },
    latitude : {
        type : String,
        required : true
    },
    longitude : {
        type : String,
        required : true
    }
})

const destination = mongoose.model("Destinations",destinationSchema);

// module.export = staff;
export default destination;

