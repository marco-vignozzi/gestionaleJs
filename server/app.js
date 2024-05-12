let rows = require("./data/Rows");
const express = require("express");

const bodyParser = require("body-parser");

app = express();

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
	res.json(rows);
});

// Gestione della richiesta OPTIONS fatta da CORS
app.options("/api", (req, res) => {
	res.sendStatus(200); // Invia una risposta OK
});
app.post("/api", (req, res) => {
	const body = req.body;
	let row = rows.find((el) => el.code === body.rowCode);
	row.name += "!";
	return res.json({ body: rows });
});

app.listen(3000, () => console.log("Listening..."));
