const Validace = require('./moduly/Validace.js');
const Mongo = require('./moduly/database/Database.js');
const database = new Mongo();

const express = require('express');
const { pojistenec } = require('./moduly/Validace.js');
const app = express();

database.spustit();

app.use(express.json());

app.post('/api/pojistenec', (req, res) => {
    const { error } = Validace.pojistenec(req.body);
    if(error){
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
    }
    else{
        database.ulozitPojistence(req.body)
            .then(result => res.status(200).send(result))
            .catch(error => res.status(404).send("Chyba zapsání pojistence do databáze"))
    }
});
app.post('/api/pojisteni/:pojistenec', (req, res) => {
    const { error } = Validace.pojisteni(req.body);
    if(error){
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
    }
    else{
        database.ulozitPojisteni(req.params.pojistenec, req.body)
            .then(result => res.status(200).send(result))
            .catch(error => res.status[404].send("Chyba zapsání pojištění do databáze"))
    }
});
app.post('/api/udalost/:pojisteni', (req, res) => {
    const { error } = Validace.udalost(req.body);
    console.log(req.params);
    if(error){
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
    } else {
        res.status(200).send("V pořádku");
    }
});

app.get('/api/pojistenci', (req, res) => {
    database.ziskatPojistence()
        .then(pojistenci => res.status(200).send(pojistenci))
        .catch(err => res.status(404).send("Chyba čtení z databáse"));
})
app.get('/api/pojistenec/:id', (req, res) => {
    database.ziskatPojistence(String(req.params.id))
        .then(pojistenec => res.status(200).send(pojistenec))
        .catch(err => res.status(404).send("Chyba čtení z databáze"));
});

app.delete('/api/pojistenec/:id', (req, res) => {
    database.smazatPojistence(String(req.params.id))
        .then(pojistenec => res.status(200).send(`Pojištěnec ${pojistenec.jmeno} ${pojistenec.prijmeni} byl úspěšně smazán`))
        .catch(err => res.status(404).send("Chyba čtení z databáze"));
});

//63e0a3d4ef791bbe8136575d

app.listen(3000, () => console.log('Listening on port 3000...'))