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
                    attributes: ['username'],
                },
            }
            ],
        });
        res.json(postData);
        console.log(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});


router.get ('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
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
        console.log(postData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_post_id: req.body.user_post_id
        });
        res.json(postData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



router.post('/:id',(req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', async (req, res) => {
    try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
      if (!postData) {
        res.status(400).json({ message: 'No post with that id'})
      }
      res.status(200).json(postData);
  } catch (err) {
    res.status(500).json('Error in deleting post')
  }
  });

module.exports = router;
