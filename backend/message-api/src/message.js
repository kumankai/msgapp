const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

///////// POSTGRES //////////

const {Client} = require('pg');

const PG = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "msgapp"
})

async function pgconnect() {
    try {
        await PG.connect();
        console.log("Connected to Postgres post:5432");
    } catch (err) {
        console.error(err);
    }
}

////////////////////////////

app.get('/', (req, res) => 
    res.json({message: 'Docker is easy' })
);

////////////////////////////

try {
pgconnect();
app.listen(port, () =>
    console.log(`Message API listening on port ${port}`)
);
} catch (err) {
    console.error(err);
}