const { User } = require('../models');

const userData = [
    {
     username: 'ShiviSL',
     email: 'shivi@gmail.com',
     password: 'password123',
    },
    {
     username: 'KarenS2000',
     email: 'kshirvanyan2000@gmail.com',
     password: 'password123',
    },
    {
     username: 'Michael_Scott',
     email: 'mscott@dundermifflin.com',
     password: 'password123',
    },
    {
     username: 'Dwight_Shrute',
     email: 'dshrute@dundermifflin.com',
     password: 'password123',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;