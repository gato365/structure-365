const sequelize = require('../config/connection');
const { User, Exercise } = require('../models');

const userData = require('./userData.json');
const exerciseData = require('./exerciseData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // for (const exercise of exerciseData) { 
  for (let i = 0; i < 15; i++) {

    const exercise = exerciseData[Math.floor(Math.random() * exerciseData.length)]


    exercise.powerInfo = JSON.stringify(exercise.powerInfo)
    await Exercise.create({
      ...exercise,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
