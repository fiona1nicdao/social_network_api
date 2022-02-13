const {User, Thought} = require('../models');

module.exports = {
    // get all thoughts 
    getAllThoughts(req, res){
        Thought.find()
            .then((thoughts)=> res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    }
}