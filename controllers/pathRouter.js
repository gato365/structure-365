const jwt = require('jsonwebtoken');
const { Router } = require ("express");
const User = require('../models/User');
const Exercise = require('../models/Exercise');
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
        style: 'home.css',
        user: plainUser,
        xDate: dateT,
        yPower: powerT,

    });
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

pathRouter.get("/exercise/:id", auth, async (req, res) => {
    const { id } = req.params;
    

    const exercise = await Exercise.findByPk(id);

    console.log(exercise); 
    if (!exercise) {
        res.status(404).end("No such exercise");
        return;
    }

    const exerciseSimple = exercise.get({ simple: true });

    // const pledges = await Pledge.findAll({
    //     where: {
    //         ProjectId: id,
    //     },
    // });

    // const totalPledged = pledges.reduce((sum, pledge) => {
    //     return sum + pledge.amount;
    // }, 0);

    // let userPledge = null;
    // if (req.user) {
    //     userPledge = await Pledge.findOne({
    //         where: {
    //             ProjectId: project.id,
    //             UserId: req.user.id,
    //         },
    //     });
    //     userPledge = userPledge.get({ simple: true });
    // }

    // res.render('project', {
    //     project: projectSimple,
    //     isCreator: req.user?.id === project.creatorId,
    //     isLoggedIn: !!req.user,
    //     userPledge,
    //     totalPledged,
    // });
});















module.exports = pathRouter;