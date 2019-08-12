const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const utils = require('./helper/utils');
const targetIncidents = [ 'Fire', 'Flood', 'Drought', 'Hurricane', 'Tornado', 'Earthquake', 'Snow' ];
const { url, configs, mysqlConfigs } = require('../configs/dbConfig');
const mysql = require('mysql');
const con = mysql.createConnection({mysqlConfigs});


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:state', async (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db(configs.db);
        var query = { state: req.params.state.toUpperCase(), incidentType: {$in: targetIncidents} };
        dbo.collection("fema").find(query).toArray(function(err, body) {
          if (err) throw err;
            res.send(utils.transformFEMABody(body));
          db.close();
        });
      });

});

router.get('/:state/:zip', async (req, res) => {
  con.connect(function(err) {
    if (err) throw err;
    con.query("select * from disasterdec where state = 'ID' and AFZIPCODES like '%83401%';", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
  res.send('query completed!');
})

module.exports = router;
