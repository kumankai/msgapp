const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

///////// MONGODB //////////

const uri = 'mongodb+srv://jangga:aW1S3rayPUzxJCJU@cluster0.ge9dtvn.mongodb.net/?retryWrites=true&w=majority';

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
    mdbconnect();
    pgconnect();
    app.listen(port, () =>
        console.log(`Message API listening on port ${port}`)
    );
} catch (err) {
    console.error(err);
}