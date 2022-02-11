const {Schema, model} = require('mongoose');

// Schema for User 
const userSchema = new Schema(
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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ ,'Please enter an email.']
            // check!! valid email (look into mongoose matching validation)
        },
        thoughts:[
            {
                type:Schema.Types.ObjectId,
                ref: 'thoughts',
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
const User = model('user', userSchema);

// create a virutal property 'friendCount'
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

module.exports = User;