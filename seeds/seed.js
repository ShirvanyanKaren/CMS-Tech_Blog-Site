const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds')
const seedBlogPosts = require('./blog-post-seeds');
const seedComments = require('./comment-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  await seedUsers();

  await seedBlogPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
