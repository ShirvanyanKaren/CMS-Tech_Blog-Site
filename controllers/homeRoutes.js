const router = require('express').Router();
const { Post, User } = require('../models');
const { findAll } = require('../models/User');
const withAuth = require('../utils/auth');


router.get('/', async (req,res) => {
    try {
    const postData = await Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'user_post_id',
            'posted_date',
        ],
        include: [{
            model: User,
            attributes: [
                'id',
                'username',
            ]
        }
    ],
    });
    const posts = postData.map((post) => post.get({ plain: true}));
    console.log(posts);
    res.render('home-page', { 
        posts,
        // loggedIn : req.session.loggedIn,
    });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});


router.get('/post/:id', withAuth, async (req, res) => {
    try {
    const postData = await Post.findByPk( req.paramd.id, {
        include: [{
            model: Post,
            attributes: [

            ]
        }
    ],
    });
    const posts = postData.map((post) => post.get({ plain: true}));
    res.render('single-post', { 
        posts, 
        loggedIn : req.session.loggedIn,
    });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

module.exports = router;