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
        console.log("validní");
        res.status(200).send("correct");
    }

    /*database.ulozitPojistence({
        "jmeno": "Pavel",
        "prijmeni": "Plíhal",
        "mail": "Pavel@Plihal.cz",
        "telefon": 654987321,
        "ulice": "Hlavní ulice 21",
        "mesto": "Praha",
        "psc": 471423,
        "narozeni": "1999-08-23"
    });*/
    //res.send(req.body);
});

app.listen(3000, () => console.log('Listening on port 3000...'))