const { Post } = require('../models');

const postData = [
    {
     title: 'MVC',
     content: 'MVC allows users to maintain a true seperation of concerns, devising their code between the Model Layer for Data',
     user_post_id: 1,
    },
    {
     title: 'Handlebars',
     content: 'Handlebars is a simple templating language. It uses a template and an input object to generate HTML or other text formats. Handlebars templates look like regular text with embedded Handlebars expressions.',
     user_post_id: 2,
    },
    {
     title: 'Dunder Mifflin Will Incorporate MVC for its Website',
     content: 'For all employees, this means paycuts so we can hire developers that actually understand this stuff.',
     user_post_id: 3,
    },
    {
     title: 'Promoted to Assistant Regional Manager',
     content: 'Yes!',
     user_post_id: 4,
    },

];

const seedBlogPosts = () => Post.bulkCreate(postData);

module.exports = seedBlogPosts;