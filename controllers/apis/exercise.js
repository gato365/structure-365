const { Router } = require("express");
const jwt = require("jsonwebtoken");

const { Exercise } = require('../../models');

// Insomnia
// 1) Post a exercise 
// 1.a) user token should have eveerything
// 

const exerciseRouter = new Router();

exerciseRouter.post('/', async (req, res) => {
  const { exerciseName, date, powerInfo } = req.body;

  const newExercise = await Exercise.create({
    exerciseName,
    date,
    powerInfo: JSON.stringify(powerInfo),
    // userId: req.user.id,
  });

  console.log(newExercise);

  res.json({
    id: newExercise.id,
    date: newExercise.date,
    powerInfo: newExercise.powerInfo
  });
});



// 2) Get a bunch of exercises for user (this is for user )


// 3) Get 1 exercise
exerciseRouter.get('/:id', async (req, res) => {

  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      include: [{ model: User, as: 'user_id' }]
    });
  }


});

// 4) Delete 1 exerise



module.exports = exerciseRouter;


