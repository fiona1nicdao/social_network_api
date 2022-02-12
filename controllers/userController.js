const {User} = require('../models/user');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })

    }
}