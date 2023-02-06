const Validace = require('./moduly/Validace.js');
const Mongo = require('./moduly/database/Database.js');
const database = new Mongo();

const express = require('express');
const { pojistenec } = require('./moduly/Validace.js');
const app = express();

database.spustit();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello, it works');
});

app.post('/api/pojistenec', (req, res) => {
    const { error } = Validace.pojistenec(req.body);
    if(error){
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
    }
    else{
        database.ulozitPojistence(req.body)
            .then(result => res.send(result))
            .catch(error => res.send("Chyby zapsání pojistence do databáze"))
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
        .catch(err => res.status(404).send("Pojištěnec nenalezen" + err))
});

app.listen(3000, () => console.log('Listening on port 3000...'))