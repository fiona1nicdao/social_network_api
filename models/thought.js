const {Schema, model} = require('mongoose');

// Schema for Thought
const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minLength: [1, 'must have at least 1 character for text'],
            maxLegnth: [280,'too many characters, only 280 characters allowed']
        },
        createdAt:{
            type:Date,
            default:Date.now,
            // use a getter method to format the timestamp on query
        },
        username:{
            type: String,
            required: true
        },
        reactions:[
            {
                type:Schema.Types.ObjectId,
                ref:'Reaction'
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

// initalized our Thought model
const Thought = model('Thought',ThoughtSchema);

// create a virual property 'reactionCount'
ThoughtSchema.virtuals('reactionCount').get(function(){
    return this.reactions.length;
})

module.exports = Thought;