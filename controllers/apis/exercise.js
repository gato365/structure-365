const { Router } = require("express");
// const { readFromFile, readAndAppend } = require('../../helpers');
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



// 2) GET Route for retrieving all the exercises
exerciseRouter.get('/', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll();
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }

});





// 3) Get 1 exercise
exerciseRouter.get('/:id', async (req, res) => {

  console.info(`${req.method} request received for it work`);

  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      // Need to do a task, I am pretty SUre
      // include:  ['powerInfo'],
    });





    function addsum(arr) {
      var sum = 0;
      for (var z = 0; z < arr.length; z++) {
        sum += arr[z];
      }
      return sum;
    }

    const powerData = await Exercise.findByPk(req.params.id, {
      attributes: ['powerInfo'],
    });









    const numberSets = powerData.powerInfo.length;
    const calculatedPower = [];

    // Calculate Power for all sets
    for (let i = 0; i < numberSets; i++) {
      let setPower = powerData.powerInfo[i].reps * powerData.powerInfo[i].weight;
      calculatedPower.push(setPower);
    }


    console.log(calculatedPower);



    // Attempt 0: Just as it is (an JSON Object?)
    // console.log(powerData);
    // Attempt 1: Turns into a string
    // console.log(JSON.stringify(powerData));
    // Attempt 2: Get First element from JSON (Does not work-undefined)
    // console.log(powerData[0]);
    // Attempt 3: Parse object
    // console.log(JSON.parse(powerData));


    if (!exerciseData) {
      res.status(404).json({ message: 'No exercise found with this id!' });
      return;
    }


    // Print to Screen
    res.status(200).json(exerciseData);



  } catch (err) {

    console.log(req.params.id);

    res.status(500).json(err);
  }

});







// 4) Delete 1 exerise



// 5) Update 1 exercise
// Updates book based on its book_id
// exerciseRouter.put('/:id', (req, res) => {
//   //Calls the update method on the Book model
//   Exercise.update(
//     {
//       // All the fields you can update and the data attached to the request body.
//       id: req.body.id,
//       date: req.body.date,
//       powerInfo: req.body.powerInfo
//     },
//     {
//       // Gets a exercise based on the id given in the request parameters
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedExercise) => {
//       res.json(updatedExercise);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
// });





module.exports = exerciseRouter;


