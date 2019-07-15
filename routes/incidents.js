const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || 'mongodb://localhost/risk-assessment';
const bodyParser = require('body-parser');
const utils = require('./helper/utils');
const targetIncidents = [ 'Fire', 'Flood', 'Drought', 'Hurricane', 'Tornado', 'Earthquake', 'Snow' ];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:state', async (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db('risk-assessment');
        var query = { state: req.params.state, incidentType: {$in: targetIncidents} };
        dbo.collection("fema").find(query).toArray(function(err, body) {
          if (err) throw err;
            res.send(utils.transformFEMABody(body));
          db.close();
        });
      });

})

module.exports = router;