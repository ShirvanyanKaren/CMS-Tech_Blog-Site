const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_post_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'user_post_id',
                'posted_date',
            ],
            order: [['posted_date', 'DESC']],
            include: [{
                model: User,
                attributes: [
                    'id',
                    'username',
                ]
            },
            {
                model: Comment,
                attributes:  [
                    'id',
                    'user_comment',
                    'user_id',
                    'post_id',
                    'comment_date',
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ],

        }); console.log(postData);
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn : req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
});


router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'content',
                'user_post_id',
                'posted_date',
            ],

            order: [['posted_date', 'DESC']],
            include: [{
                model: User,
                attributes: [
                    'id',
                    'username',
                ]
            },
            {
                model: Comment,
                attributes:  [
                    'id',
                    'user_comment',
                    'user_id',
                    'post_id',
                    'comment_date',
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ],
        });
        const post = await postData.get({ plain: true });
        console.log(post);
        res.render('edit-post', {
            post,
            loggedIn : req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.get('/create', async (req, res) => {
    try {

        res.render('create-post', {
        loggedIn: true,
        }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
   

});




  

module.exports = router;
