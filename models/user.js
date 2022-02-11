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
        email: {
            type: String,
            require:true,
            // unique
            // valid email (look into mongoose matching validation)
        },
        thouhts:{
            // array?
        },
        friends:{
            // array
        }
    }
)