const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const users = require('./routes/users');
const incidents = require('./routes/incidents');
const app = express();

const uristring = process.env.MONGODB_URI || 'mongodb://localhost/risk-assessment';
mongoose.connect(uristring, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log(`Succeeded connected to: ${uristring}`))
    .catch(err => console.log(`ERROR connecting to: ${uristring}.  ${err}`)); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

//app.use(cors());

app.use('/api/v1/users', users);
app.use('/api/v1/incidents', incidents);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));