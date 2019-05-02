const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const users = require('./routes/users');
const app = express();


const config = require('./db');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));

app.use('/api/v1/users', users);

// app.post('/users', async (req, res) =>{
//     const { error } = validate(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);


// });


// app.get('/results/:state', async function(req, res){
//     const state = req.params.state;

//     res.send(`returning results for ${state}`);
// });


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));