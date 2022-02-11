const {Schema, model} = require('mongoose');

// Schema for User 
const UserSchema = new Schema(
    {
        username:{
            type: String,
            unique: true,
            require:true,
            trim: true
        },
        email: {
            type: String,
            require:true,
            unique:true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ ,'Please enter a valid email.']
            // check!! valid email (look into mongoose matching validation)
        },
        thoughts:[
            {
                type:Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends:[
            {
                type:Schema.Types.ObjectId,
                ref:'User',
            }
        ]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id:false
    }
)

// initialize our User model
const User = model('User', UserSchema);

// create a virutal property 'friendCount'
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

module.exports = User;