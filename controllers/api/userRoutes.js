const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth')




router.get ('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes:[{
                exclude: ['password'],
        }]
        });
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }



});



router.get ('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes:[{
                exclude: ['password'],
        }],
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
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
