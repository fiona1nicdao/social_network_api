const {User, Thought} = require('../models');

module.exports = {
    // get all thoughts 
    getAllThoughts(req, res){
        Thought.find()
            .then((thoughts)=> res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get a single thought
    getSingleThought(req,res){
        Thought.findOne({ _id:req.params.thoughtId})
            .select('-__v')
            .then((thought)=>
                !thought
                    ? res.status(404).json({message:'No thought with that ID'})
                    : res.json(thought)
            )
            .catch((err)=> res.status(500).json(err));
    },
    // create a new Thought
    createThought(req,res){
        Thought.create(req.body)
            .then((thought)=>res.json(thought))
            .catch((err)=>{
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // update a thought
    updateThought(req,res){
        Thought.findOneAndUpdate(
            { _id:req.params.thoughtId},
            {$set: req.body},
            // DO i need this? {runValidators:true, new:true}
        )
        .then((thought)=>
            !thought
                ? res.status(404).json({message:'No thought with this id'})
                : res.json(thought)
        )
        .catch((err)=>{
            console.log(err)
            res.status(500).json(err);
        })
    },
    // delete a thought
    deleteThought(req,res){
        Thought.findOneAndDelete({ _id: req.params.courseId})
            .then((course)=> 
                !course
                    ? res.status(404).json({message:'No thought with that id'})
                    :User.deleteMany({ _id:{$in:thought.users} })
            )
            .then(()=> res.json({message:'Thought and users deleted!'}))
            .catch((err)=> res.status(500).json(err));
    },
    // add Reaction to a thought 
    addReaction(req,res){
        console.log('You are adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id:req.params.thoughtId},
            {$addToSet:{reactions:req.body}},
            // DO i need this? {runValidators:true, new:true}
        )
        .then((thought)=>
            !thought
                ? res
                    .status(404)
                    .json({message:'No thought found with that id'})
                : res.json(thought)
        )
        .catch((err)=>{
            console.log(err)
            res.status(500).json(err);
        })
    },
    removeReaction(req,res){
        Thought.findOneAndUpdate(
            { _id:req.params.thoughtId},
            {$pull:{reaction:{reactionId:req.params.reactionId}}}
            // DO i need this? {runValidators:true, new:true}
        )
        .then((thought)=>
            !thought
                ?res
                    .status(404)
                    .json({message:'No thought found with that id'})
                :res.json(thought)   
        )
        .catch((err)=>{
            console.log(err)
            res.status(500).json(err);
        })
    }
    
}