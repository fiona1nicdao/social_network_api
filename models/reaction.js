const {Schema, model} = require('mongoose');

// Schema for Reaction
const ReactionSchema = new Schema(
    {
        reactionId:{
            type:Schema.Types.ObjectId,
            // Default value is set to a new ObjectId
        },
        reactionBody:{
            type:String,
            require:true,
            maxLegnth: [280,'too many characters, only 280 characters allowed']
        },
        username:{
            type:String,
            requried:true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            // use a getter method to format the timestamp on query
        }
    },
    {
        toJSON:{
            getters:true
        },
        id: false
    }
)

module.exports = ReactionSchema;
/*
this will now be a model, but rather will be used as the reaction field's subdocument schema in the Thought model
*/