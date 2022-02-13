const {User, Thought} = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .then((users)=> res.json(users))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    // get a single user
    getSingleUser(req,res){
        User.findOne({ _id:req.params.userId })
        // what does this do?
        .select('-__v')
        .then(async (user)=>
            !user
                ? res.status(404).json({message:"No User with that ID"})
                : res.json({user})
        )
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err);
        })
    },
    // create a new User
    createUser(req,res){
        User.create(req.body)
            .then((user)=> res.json(user))
            .catch((err) =>res.status(500).json(err));
    },
    // updateUser
    updateUser(req,res){
        User.findOneAndUpdate(
            { _id:req.params.userId},
            {$set:req.body},
            // DO i need this? {runValidators:true, new:true}
        )
        .then((user)=>
            !user
                ? res.status(404).json({message:'No user with this id!'})
                : res.json(user)
        )
        .catch((err)=> {
            console.log(err)
            res.status(500).json(err)
        })
    },
    // delete a User
    deleteUser(req,res){
        User.findOneAndRemove({ _id:req.params.userId})
            .then((user)=>
            !user
                ? res.status(404).json({message:'No such user exists'})
                :Thought.findOneAndUpdate(
                    {users: req.params.studentId},
                    {$pull:{users:req.params.userId}},
                    {new:true}
                )
            )
            .then((thought)=>
                !thought
                    ? res.status(404).json({message:"User deleted, but no thoughts found"})
                    : res.json({message:'User successfully deleted'})
            )
            .catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            })
    },
    // add a friend to a user
    // need to check this!!!! 
    addFriend(req,res){
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet: {friends:req.body}},
            // DO i need this? {runValidators:true, new:true}
        )
        .then((user)=>
            !user
                ? res
                    .status(404)
                    .json({message:'No user found with that ID'})
                : res.json(user)
        )
        .catch((err)=> {
            console.log(err)
            res.status(500).json(err);
        })
    },
    // remove friend from a user 
    // need to check this!!!! 
    removeFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull:{friend:{friendId: req.params.friendId}}}
            // DO i need this? {runValidators:true, new:true}
        )
            .then((user)=>
            !user
                ?res
                    .status(404)
                    .json({message:'No user found with this ID'})
                :res.json(user)
            )
            .catch((err)=>{
                console.log(err)
                res.status(500).json(err);
            })
    }
}