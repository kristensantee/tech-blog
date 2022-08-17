const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userSeeds = require('./user-seeds.json');
const blogSeeds = require('./blog-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeeds, {
        individualHooks: true,
        returning: true
    });

    for (const blog of blogSeeds) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id
        })
    }
    process.exit(0)
};

seedDatabase();