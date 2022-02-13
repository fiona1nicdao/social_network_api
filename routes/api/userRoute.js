const router = require('express').Router();

const{
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// endpoint: /api/users/
router.route('/')
    .get(getAllUsers)
    .post(createUser);
// endpoint: /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
// endpoint: /api/users/:userId/friend
router.route('/:userId/friend/:friendId')
    .get(addFriend);
// endpoint: /api/users/:userId/friend/:friendId
router.route('/:userId/friend/:friendId')
    .delete(removeFriend);

module.exports = router;
