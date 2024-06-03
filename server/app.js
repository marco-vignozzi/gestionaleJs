const express = require('express');
const Datastore = require('nedb');
const makeValidators = require('./validators/validator');

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
// CREATE VALIDATORS
// chiamati con data e dbData dello stesso type ogni volta che si modificano i dati su db
const { validateInquilino } = makeValidators();

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
// SELECT ALL
app.get('/api/inquilini', (req, res) => {
    database.find({ type: 'inquilino' }, (err, rows) => {
        if (err) {
            res.end();
            return;
        }
        res.json(rows);
    });
});
// UPDATE
// TODO: capire per modificare come fare: usare selettore tipo? nel body della request aggiungere tipo {key: "key", value: "value"}
// Questo per ora è solo l'update, voglio sia update che insert con questo? per farlo usare options = {upsert: true}
app.post('/api/inquilini', (req, res) => {
    const data = req.body?.data;
    if (!data) return res.json({ status: 'error', message: 'No Data' });
    if (!validateInquilino(data)) {
        return res.json({
            status: 'error',
            message: 'Validation error'
        });
    }
    // TODO: capire perchè non funziona
    return database.findOne(
        { type: 'inquilino', _id: data._id },
        (err, doc) => {
            if (err || !doc) {
                return res.json({
                    status: 'error',
                    message: "Old document doesn't exist"
                });
            }
            database.update(
                { _id: doc._id },
                { ...data },
                { returnUpdatedDocs: true, upsert: false },
                (err, _, affectedDocuments) => {
                    if (err) {
                        return res.json({
                            status: 'error',
                            message: 'Update failed'
                        });
                    }

                    return res.json({
                        status: 'success',
                        updated: affectedDocuments,
                        timestamp: Date.now()
                    });
                }
            );
        }
    );
});
