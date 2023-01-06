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

console.info(`${req.method} request received for it work`);
  
  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      // Need to do a task
    });


    if (!exerciseData ) {
      res.status(404).json({ message: 'No exercise found with this id!' });
      return;
    }

    res.status(200).json(exerciseData);
  
  } catch (err) {

    console.log(req.params.id);

    res.status(500).json(err);
  }

  });

// 4) Delete 1 exerise



module.exports = exerciseRouter;


