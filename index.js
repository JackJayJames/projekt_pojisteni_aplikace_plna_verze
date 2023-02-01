const Mongo = require('./moduly/database/Database.js')
const database = new Mongo();

const express = require('express');
const app = express();

database.spustit();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello, it works');
});
app.post('/', (req, res) => {

    database.ulozitPojistence({
        "jmeno": "Pavel",
        "prijmeni": "Plíhal",
        "mail": "Pavel@Plihal.cz",
        "telefon": 654987321,
        "ulice": "Hlavní ulice 21",
        "mesto": "Praha",
        "psc": 471423,
        "narozeni": "1999-08-23"
    });

    console.log(req.body);
    res.send(req.body);
});

app.listen(3000, () => console.log('Listening on port 3000...'))