const {Schema, Types} = require('mongoose');

// Schema for Reaction
const ReactionSchema = new Schema(
    {
        reactionId:{
            type:Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type:String,
            require:true,
            maxlegnth: [280,'too many characters, only 280 characters allowed']
        },
        username:{
            type:String,
            requried:true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            // use a getter method to format the timestamp on query
            get:(createDate) => Intl.DateTimeFormat('en-US').format(createDate)
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