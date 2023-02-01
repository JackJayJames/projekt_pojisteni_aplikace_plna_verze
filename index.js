const Mongo = require('./moduly/Database.js')
const database = new Mongo();

const express = require('express');
const app = express();

data.funguje();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello, it works');
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(3000, () => console.log('Listening on port 3000...'))