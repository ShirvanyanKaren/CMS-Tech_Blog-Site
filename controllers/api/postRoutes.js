const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

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
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});


router.get ('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            attributes: [
                'id',
                'title',
                'content',
                'user_post_id',
                'posted_date',
            ],
            where: {
                id: req.params.id
              },
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
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.put ('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content,
            
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with that id'});
            return;
        }
        res.json(postData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content,
            
            where: {
                id: req.params.id,
            },
        });
        res.json(postData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post('/:id', withAuth,(req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
