require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

///////// MONGODB //////////

const uri = process.env.URI;

async function mdbconnect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}

///////// POSTGRES //////////

const {Client} = require('pg');

const PG = new Client({
    host: process.env.PG_ENDPOINT,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    password: process.env.PG_PASS,
    database: process.env.PG_DB
})

async function pgconnect() {
    try {
        await PG.connect();
        console.log("Connected to Postgres port:5432");
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
    mdbconnect();
    pgconnect();
    app.listen(port, () =>
        console.log(`Message API listening on port ${port}`)
    );
} catch (err) {
    console.error(err);
}