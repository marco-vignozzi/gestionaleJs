const express = require('express');
const Datastore = require('nedb');

const bodyParser = require('body-parser');

app = express();
// SECURITY
app.use(express.json({ limit: '1mb' }));
app.listen(3000, () => console.log('Listening...'));

// LOADING DB
const database = new Datastore({ filename: 'data/database.db' });
database.loadDatabase((err) => {
    !err && console.log('Hello db no errs');
});

// MiddleWare per gestire richieste JSON
app.use(bodyParser.json());
// Middleware per abilitare CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

app.get('/', (req, res) => {
    res.send('Hello! Welcome to my Server :)');
});

// Gestione della richiesta OPTIONS fatta da CORS
app.options('/api', (req, res) => {
    res.sendStatus(200); // Invia una risposta OK
});

// INQUILINI
// GET
app.get('/api/inquilini', (req, res) => {
    database.find({ type: 'inquilino' }, (err, rows) => {
        if (err) {
            res.end();
            return;
        }
        res.json(rows);
    });
});
// POST
// TODO: capire per modificare come fare: usare selettore tipo? nel body della request aggiungere tipo {key: "key", value: "value"}
app.post('/api/inquilini', (req, res) => {
    const { data, key, newValue } = req.body?.data;
    if (!data) return res.json({ status: 'error' });
    const now = Date.now();
    if (key && newValue) {
        database.update({ _id: data._id }, { $set: { [`${key}`]: newValue } });
    } else {
        database.update(
            { code: data.name },
            { $set: { name: data.name + '*' } },
            {},
            () => {}
        );
    }
    return res.json({
        status: 'success',
        timestamp: now
    });
});
