const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
    try { const commentData = await Comment.findAll({});
        
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.post('/', async (req, res) => {
    try { const commentData = await Comment.Create({
        user_comment: req.body.user_comment,
        user_id: req.body.user_id,
    });
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.post('/', async (req, res) => {
    try { const commentData = await Comment.destroy({
        where: {
            id: req.params.id
        }
    });
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

module.exports = router;
