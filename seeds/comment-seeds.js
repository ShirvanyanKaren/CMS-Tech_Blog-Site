const { Comment } = require('../models');

const commentData = [
    {
     user_comment: 'Thats great!',
     user_id: 2,
     post_id: 1,
    },
    {
     user_comment: 'I just started using Handlebars. So convenient!',
     user_id: 1,
     post_id: 2,
    },    
    {
     user_comment: 'Does this apply to the Assistant Regional Manager?',
     user_id: 4,
     post_id: 3,
    },
    {
     user_comment: 'Dwight, youre the Assistant to the Regional Manager.!',
     user_id: 3,
     post_id: 4,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;