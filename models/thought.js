const {Schema, model} = require('mongoose');
// const dateFormat = require('../utils/dateFormat')
const ReactionSchema =require('./reaction')

// Schema for Thought
const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: [1, 'must have at least 1 character for text'],
            maxlegnth: [280,'too many characters, only 280 characters allowed']
        },
        createdAt:{
            type:Date,
            default:Date.now,
            // use a getter method to format the timestamp on query
            get:(createDate) => Intl.DateTimeFormat('en-US').format(createDate)
        },
        username:{
            type: String,
            required: true
        },
        reactions:[ReactionSchema]
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
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

module.exports = Thought;