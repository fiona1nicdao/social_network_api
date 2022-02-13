const {User, Thought} = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({path:'thoughts',select:'-__v'})
            .select('-__v')
            .then(user=> res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    // get a single user
    getSingleUser(req,res){
        User.findOne({ _id:req.params.userId })
        .populate({path:'thoughts',select:'-__v'})
        .select('-__v')
        .then((user)=>
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
    addFriend({params},res){
        User.findOneAndUpdate(
            // friendId add to userId friends 
            {_id:params.userId},
            {$addToSet: {friends:params.friendId}},
            {runValidators:true, new:true}
        )
        .then((user)=>{
            !user
            ? res
                .status(404)
                .json({message:'No user found with that ID'})
            : res.json(user);
            User.findOneAndUpdate(
                // userId add to friendId friends
                {_id:params.friendId},
                {$addToSet: {friends:params.friendId}},
                {runValidators:true, new:true}
            )
            .then((user2)=>{
                !user2
                ? res
                    .status(404)
                    .json({message:'No user found with that ID'})
                : console.log("added friend")
            })
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json(err);
        })
    },
    // remove friend from a user
    removeFriend({params},res){
        User.findOneAndUpdate(
            {_id:params.userId},
            {$pull:{friends: params.friendId}},
            {runValidators:true, new:true}
        )
            .then((user)=>{
                !user
                    ?res
                        .status(404)
                        .json({message:'No user found with this ID'})
                    :res.json({message:'friend deleted'})
                User.findOneAndUpdate(
                    {_id:params.friendId},
                    {$pull:{friends: params.userId}},
                    {runValidators:true, new:true}
                )
                .then((user2)=>{
                    !user2
                        ?res
                            .status(404)
                            .json({message:'No user found with this ID'})
                        :console.log("friend deleted")
                })
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json(err);
            })
    }
}