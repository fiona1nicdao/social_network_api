const router = require('express').Router();

const{
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// endpoint: /api/thoughts/
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reaction')
    .post(addReaction)

router.route('/:thoughtId/reaction/:reactionId')
    .delete(removeReaction);

module.exports = router;