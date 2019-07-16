const {User, validate} = require('../models/User');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const utils = require('./helper/utils');
const targetIncidents = [ 'Fire', 'Flood', 'Drought', 'Hurricane', 'Tornado', 'Earthquake', 'Snow' ];
const MongoClient = require('mongodb').MongoClient;
//const url = `${process.env.MONGODB_URI}/risk-assessment` || 'mongodb://localhost/risk-assessment';
let cloud = true;
 
let mongodbHost = '127.0.0.1';
let mongodbPort = '27017';
 
let authenticate = '' ;
//cloud
if (cloud) {
 mongodbHost = 'ds153566.mlab.com';
 mongodbPort = '53566';
 authenticate = 'heroku_x4b1bbw2:a8b4oh91gdg80ekftok3cf957j@'
}
 
var mongodbDatabase = 'heroku_x4b1bbw2';
 
// connect string for mongodb server running locally, connecting to a database called test
const url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = new User({ 
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      streetAddress: req.body.streetAddress,
      state: req.body.state,
      zip: req.body.zip
    });
    await user.save();
    
    res.send(user);
  });

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).send('The user with the given ID was not found.');
  
  //TODO: Get Data from FEMA and not from the API 
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    const dbo = db.db('risk-assessment');
    var query = { state: user.state, incidentType: {$in: targetIncidents} };
    dbo.collection('fema').find(query).toArray(function(err, body) {
      if (err) throw err;
        res.send(utils.transformFEMABody(body));
      db.close();
    });
  });

  
  });

module.exports = router; 