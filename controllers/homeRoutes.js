const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { findAll } = require('../models/User');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
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
        const posts = postData.map((post) => post.get({ plain: true }));
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


router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'title',
                'content',
                'user_post_id',
                'posted_date',
            ],
            include: [
                {
                model: Comment,
                attributes: [
                    'id',
                    'user_comment',
                    'user_id',
                    'post_id',
                    'comment_date',
                ],
                 include:  {
                model: User,
                attributes: ['username', 'id'],
                },
            },
            {
                model: User,
                attributes: [
                    'id',
                    'username',
                ]
                
        }
        ]
        });
        const post = await postData.get({ plain: true });
        console.log(post.user);
        // console.log("Comments:", postData.comments);
        // console.log("Comments:", postData.user);

        postData.comments.forEach(comment => {
            // console.log("Comment:", comment.user_comment);
            console.log("User:", comment.username);
        });

        res.render('single-post', {
            post,
            // loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;