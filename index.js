const Validace = require('./moduly/Validace.js');
const Mongo = require('./moduly/database/Database.js');
const database = new Mongo();

const express = require('express');
const app = express();

database.spustit();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello, it works');
});

app.post('/', (req, res) => {

    const { error } = Validace.pojistenec(req.body);
    if(error){
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
    }
    else{
        database.ulozitPojistence(req.body);
        console.log(`--> ${req.body.jmeno} ${req.body.prijmeni}`);
        res.status(200).send(req.body.jmeno + " " + req.body.prijmeni);
    }
});

app.listen(3000, () => console.log('Listening on port 3000...'))