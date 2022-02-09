const {Schema, model} = require('mongoose');

// Schema for User 
const userSchema = new Schema(
    {
        username:{
            type: String,
            // unique
            require:true,
            // trimemed
        },
        email: {}
        // finish here 
    }
)