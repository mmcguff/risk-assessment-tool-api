const {User, validate} = require('../models/User');
const {Risk} = require('../models/risk');
const express = require('express');
const router = express.Router();


async function getRisks(state, zip) {
    //This is where the magic of looking at the FEMA data happens
    const testPayload = {
        houseFire: 66,
        wildFire: 30,
        heatWave: 15,
        drought: 20,
        flood: 74,
        hurricane: 66,
        tornado: 70,
        winterStorm: 10,
        earthQuake: 7
    };
    let risk = new Risk({...testPayload});
    risk = await risk.save();
    return testPayload; 
}

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = new User({ 
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      streetAddress: req.body.streetAddress,
      state: req.body.state,
      zip: req.body.zip,
      risk: await getRisks(req.body.state, req.body.zip)
    });
    await user.save();
    
    res.send(user);
  });

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router; 