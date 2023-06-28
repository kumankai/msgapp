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




////////////////////////////

try{
    pgconnect();
    app.listen(port, () =>  {
        console.log(`Auth API listening on port ${port}`);
    });
}
catch (err) {
    console.error(err);
}