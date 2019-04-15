const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));

app.get('/results/:state', async function(req, res){
    const state = req.params.state;

    res.send(`returning results for ${state}`);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));