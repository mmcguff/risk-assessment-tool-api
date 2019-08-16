const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { pool } = require('../configs/dbConfig');
const validationMiddleware = require('../middleware/validationMiddleware');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/disasters/:state/:zip', validationMiddleware, async (req, res) => {

  const state = await req.params.state.toUpperCase();
  const zip = await req.params.zip;
  const queryString = `select * from disasterdec where state = '${state}' and AFZIPCODES like '%${zip}%';`;

  pool.getConnection(function(err, connection) {
    connection.query(queryString, async (err, result) => {
        if (err) throw err;
        await res.send(result);
        await connection.release();
      });
    });
})

router.get('/demographics/:zip', validationMiddleware, async (req, res) => {

  const zip = await req.params.zip;
  const queryString = `select * from PopulationZip where zip = ${zip} order by minage, gender;`;

  pool.getConnection(function(err, connection) {
    connection.query(queryString, async (err, result) => {
        if (err) throw err;
        await res.send(result);
        await connection.release();
      });
    });
})

router.get('/zip-data/:zip', validationMiddleware, async (req, res) => {

  const zip = await req.params.zip;
  const queryString = `select * from Zipcodes where zip = ${zip};`;

  pool.getConnection(function(err, connection) {
    connection.query(queryString, async (err, result) => {
        if (err) throw err;
      await  res.send(result);
      await  connection.release();
      });
    });
})

module.exports = router;
