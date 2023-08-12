const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth')




router.get ('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {
                exclude: ['password'],
        }
        });
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get ('/:id',withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes:[{
                exclude: ['password'],
        }],
        where: {
            id: req.params.id
          },
            include: [{
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'content',
                    'user_post_id',
                    'posted_date',
                ],
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'user_comment',
                    'user_id',
                    'post_id',
                    'comment_date',
                ],
            }
        ]
        });
        if (!userData) {
            res.status(404).json({ message: 'No user with that id'});
            return;
        }
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put ('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!userData) {
            res.status(404).json({ message: 'No user with that id'});
            return;
        }
        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      
    });
    console.log(userData);
    console.log(userData);
    req.session.save(() => {
    req.session.username = userData.username;
    req.session.user_id = userData.id;
    req.session.loggedIn = true;
    res.status(200).json(userData);
    });
    
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});



router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    console.log(userData);
    req.session.save(() => {
      req.session.username = userData.username;
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200) .json({ user: userData, message: 'You are now logged in!' });
    });
 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/logout',  (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log('logged out');
    });
  } else {
    res.status(404).end();
    res.render('home-page');
  }
  console.log(req.session);
});

module.exports = router;
