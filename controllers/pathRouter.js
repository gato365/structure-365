const { Router } = require("express");
const { Exercise } = require("../models");

const pathRouter = new Router();



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



pathRouter.get('/', async (req, res) => {

    // try {



        // Is this where I do the following
        const newExerciseData = await Exercise.findAll() // Fileter based on user



      const powerData = newExerciseData.map(({ date,powerInfo }) => 
        [date,powerInfo]
        );
       


        const dateT = [];
        const powerT = [];

        for (let i = 0; i < powerData.length; i++) {
            const infoDatePower = powerData[i];
             dateT.push(infoDatePower[0]);
             
        
             const calPower = addPowerSets(infoDatePower[1]);
             powerT.push(calPower);
            
        }


    //   const plainPowerData = powerData.get({ plain: true });
    //   const calcultedPower = addPowerSets(powerData.powerInfo);
    //   newExerciseData.powerBig = calcultedPower;
    //   console.log(newExerciseData);
      
      //  ~~~~~~~~~~~~~~~~~~~  Calculation of Power BLOCK ~~~~~~~~~~~~~~~~~~~~~~//
      // console.log(exerciseData)
   
    // }   catch (err) {

    //     console.log(req.params);
    
    //     res.status(500).json(err);
    //   }

        // ~~~~~~~~~~~~~~~~~~ 

     

        res.render('home', {

            xDate: dateT,
            yPower: powerT,
            chartData: [
                { x: 50, y: 7 },
                { x: 60, y: 8 },
                { x: 70, y: 8 },
                { x: 80, y: 9 },
                { x: 90, y: 9 },
                { x: 100, y: 9 },
                { x: 110, y: 10 },
                { x: 120, y: 11 },
                { x: 130, y: 14 },
                { x: 140, y: 14 },
                { x: 150, y: 15 }

            ]




        });
    
})

pathRouter.get('/landing', (req, res) => {
    res.render('landing');
})

pathRouter.get('/login', (req, res) => {
    res.render('login');
})

pathRouter.get('/signup', (req, res) => {
    res.render('signup');
})

pathRouter.get('/nav', (req, res) => {
    res.render('nav');
})

module.exports = pathRouter;