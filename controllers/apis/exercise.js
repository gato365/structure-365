const { Router } = require("express");
const jwt = require("jsonwebtoken");

const { Exercise } = require('../../models');

// Insomnia
// 1) Post a exercise 
  // 1.a) user token should have eveerything
  // 



  exerciseRouter.post('/', auth, async (req, res) => {
    const { exerciseName, date, powerInfo } = req.body;

    const newExercise = await Exercise.create({
        exerciseName,
        date,
        powerInfo,
        creatorId: req.user.id,
    });

    res.json({
        id: project.id,
    });
});



// 2) Get a bunch of exercises for user (this is for user )


// 3) Get 1 exercise

// 4) Delete 1 exerise



module.exports = exerciseRouter;


