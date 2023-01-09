const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middleware/auth');

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



pathRouter.get('/', auth, async (req, res) => {

    const plainUser = req.user.get({plain: true});
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

       res.render('home', {
            user: plainUser,
            xDate: dateT,
            yPower: powerT,
   
        });
    
pathRouter.get('/landing', (req, res) => {
    res.render('landing', {
        style: 'landing.css',
    });
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

pathRouter.get('/exercise', (req, res) => {
    res.render('exercise', {
        style: 'exercise.css',
    });
})

module.exports = pathRouter;