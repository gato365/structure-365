const { Router } = require("express");

const auth = require('../../middleware/auth');
// const { readFromFile, readAndAppend } = require('../../helpers');
const jwt = require("jsonwebtoken");

const { Exercise } = require('../../models');

// Insomnia
// 1) Post a exercise 
// 1.a) user token should have eveerything
// 

const exerciseRouter = new Router();



exerciseRouter.post('/', auth, async (req, res) => {
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






function addPowerSets(tmpPowerJSON) {

  // Find Length of JSON
  const numberSets = tmpPowerJSON.length;
  // Empty Array for Powers per set
  const calculatedPower = [];

  // Calculate Power for all sets
  for (let i = 0; i < numberSets; i++) {
    let setPower = tmpPowerJSON[i].reps * tmpPowerJSON[i].weight;
    calculatedPower.push(setPower);
  }


  // Find the sum of Power for set
  let sumPower = 0;
  for (let i = 0; i < numberSets; i++) {
    sumPower += calculatedPower[i];
  }


  return sumPower;
}



// 3) Get 1 exercise
exerciseRouter.get('/:id', async (req, res) => {

  console.info(`${req.method} request received for it work`);

  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
    
    });

    const newExerciseData = exerciseData.get({ plain: true })

      //  ~~~~~~~~~~~~~~~~~~~  Calculation of Power BLOCK ~~~~~~~~~~~~~~~~~~~~~~//
    const powerData = await Exercise.findByPk(req.params.id, {
      attributes: ['powerInfo'],
    });
    const plainPowerData = powerData.get({ plain: true });
    const calcultedPower = addPowerSets(plainPowerData.powerInfo);
    newExerciseData.powerBig = calcultedPower;
    console.log(newExerciseData);
    
    //  ~~~~~~~~~~~~~~~~~~~  Calculation of Power BLOCK ~~~~~~~~~~~~~~~~~~~~~~//
    // console.log(exerciseData)




    
    if (!exerciseData) {
      res.status(404).json({ message: 'No exercise found with this id!' });
      return;
    }



    res.status(200).json(newExerciseData);

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


