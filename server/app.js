const express = require("express");
const Datastore = require("nedb");

const bodyParser = require("body-parser");

app = express();
// Security
app.use(express.json({ limit: "1mb" }));
app.listen(3000, () => console.log("Listening..."));

const database = new Datastore({ filename: "database.db" });
database.loadDatabase();

// MiddleWare per gestire richieste JSON
app.use(bodyParser.json());
// Middleware per abilitare CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello! Welcome to my Server :)");
});
app.get("/api/rows", (req, res) => {
	database.find({}, (err, rows) => {
		if (err) {
			res.end();
			return;
		}
		res.json(rows);
	});
});

// Gestione della richiesta OPTIONS fatta da CORS
app.options("/api", (req, res) => {
	res.sendStatus(200); // Invia una risposta OK
});
app.post("/api", (req, res) => {
	const data = req.body;
	const now = Date.now();
	database.update(
		{ code: data.rowCode },
		{ $set: { name: data.newValue } },
		{},
		() => {}
	);
	return res.json({
		status: "success",
		timestamp: now,
	});
});
