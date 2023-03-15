'use strict';

const User = require('./moduly/User.js');
const Pojistenec = require('./moduly/Pojistenec.js');

const Validace = require('./moduly/Validace.js');
const Mongo = require('./moduly/database/Database.js');
const database = new Mongo("mongodb://127.0.0.1:27017/pojistdb");

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.set('trust proxy', true);

database.spustit();

app.post('/api/pojistenec', (req, res) => {
    const { error } = Validace.pojistenec(req.body);
    if(error){
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
    }
    else{
        const user = new User(req.body.username, req.body.password);
        const pojistenec = new Pojistenec(req.body.jmeno, req.body.prijmeni, req.body.narozeni, req.body.mail, req.body.telefon,
        req.body.ulice, req.body.mesto, req.body.psc, req.body.pojisteni);
        

        database.ulozitPojistence(user, pojistenec, req.ip)
            .then(result => {
                res.status(200).send(result);
                console.log(`POST: Pojištěnec ${result.pojistenec.jmeno} ${result.pojistenec.prijmeni}, byl úspěšně přidán`);
            })
            .catch(err => res.status(404).send(`Chyba zapsání pojistence do databáze -> ${err}`));
    }
});
app.post('/api/pojisteni/:pojistenec/:ticketID', (req, res) => {
    const { error } = Validace.pojisteni(req.body);
    if(error){
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
    }
    else{
        database.kontrolaTicketu(req.params.pojistenec, req.params.ticketID, req.ip)
        .then(() => {
            database.ulozitPojisteni(req.params.pojistenec, req.body)
                .then(result => {
                    res.status(200).send(result);
                    console.log(`POST: Pojištění ${result.nazev} ${result.predmet} bylo přidáno pojištěnci s ID ${req.params.pojistenec}`);
                })
                .catch(err => res.status(404).send(`Chyba zapsání pojištění do databáze -> ${err}`))
        })
        .catch(err => {
            console.log("POST: " + err);
            res.status(408).send(err);
        });
    }
});

app.get('/api/pojistenci', (req, res) => {
    database.ziskatPojistence()
        .then(pojistenci => {
            res.status(200).send(pojistenci);
            console.log("GET: posílám seznam pojištěnců");
        })
        .catch(err => res.status(404).send(`Chyba čtení z databáse -> ${err}`));
})
app.get('/api/pojistenec/:id/:ticketID', (req, res) => {
    database.kontrolaTicketu(req.params.id, req.params.ticketID, req.ip)
        .then(() => {
            database.ziskatPojistence(req.params.id)
                .then(pojistenec => {
                    if(pojistenec)  console.log(`GET: ID: ${req.params.id}, posílám pojištěnce ${pojistenec.jmeno} ${pojistenec.prijmeni}`);
                    else    console.log(`GET: pojistenec nenalezen`);
                    res.status(200).send(pojistenec);
                })
                .catch(err => {
                    console.log(err.message);
                    res.status(404).send(`Chyba čtení z databáse -> ${err}`);
                });
        })
        .catch(err => {
            console.log("GET: " + err);
            res.status(408).send(err);
        });
});
app.get('/api/pojisteni/:id/:pojistenec/:ticketID', (req, res) => {
    database.kontrolaTicketu(req.params.pojistenec, req.params.ticketID, req.ip)
        .then(() => {
            database.ziskatPojisteni(req.params.id)
                .then(pojisteni => {
                    if(pojisteni)    console.log(`GET: ID: ${req.params.id}, posílám pojištění ${pojisteni.nazev} ${pojisteni.predmet}`);
                    else    console.log("GET: pojisteni nenalezeno");
                    res.status(200).send(pojisteni);
                })
                .catch(err => {
                    console.log(err.message);
                    res.status(404).send(`Chyba čtení z databáse -> ${err}`);
                });
        })
        .catch(err => {
            console.log("GET: " + err);
            res.status(408).send(err);
        });
});

app.delete('/api/pojistenec/:id/:ticketID', (req, res) => {
    database.kontrolaTicketu(req.params.id, req.params.ticketID, req.ip)
        .then(() => {
            database.smazatPojistence(req.params.id)
                .then(pojistenec => {
                    res.status(200).send(`Pojištěnec ${pojistenec.jmeno} ${pojistenec.prijmeni} byl úspěšně smazán`);
                    console.log(`DELETE: Pojištěnec ${pojistenec.jmeno} ${pojistenec.prijmeni} byl úspěšně smazán`);
                })
                .catch(err => res.status(404).send(`Chyba mazání z databáse -> ${err}`));
        })
        .catch(err => {
            console.log("DELETE: " + err);
            res.status(408).send(err);
        });
});
app.delete('/api/pojisteni/:id', (req, res) => {
    database.smazatPojisteni(req.params.id)
        .then(pojisteni => {
            res.status(200).send(`Pojištění ${pojisteni.nazev} na ${pojisteni.predmet} bylo úspěšně smazáno`);
            console.log(`DELETE: Pojištění ${pojisteni.nazev} na ${pojisteni.predmet} bylo úspěšně smazáno`);
        })
        .catch(err => res.status(404).send(`Chyba mazání z databáse -> ${err}`));
    });

app.listen(5500, () => console.log('Listening on port 5500...'))