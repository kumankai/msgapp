require("dotenv").config();
const express = require('express');
const authRoutes = require('../routes/auth-routes');
const { throwError } = require('../helpers/error');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;

///////// MONGODB //////////

const uri = process.env.URI;

const mdbconnect = async () => {
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

const pgconnect = async () => {
    try {
        await PG.connect();
        console.log(`Connected to Postgres port:${process.env.PG_PORT}`);
    } catch (err) {
        console.error(err);
    }
}

////////////////////////////

app.use(express.json());


//Main middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  
app.use(authRoutes);

//Hello world
  
app.use((err, req, res, next) => {
    console.log(err);
    let code = 500;
    let message = 'Something went wrong.';
    if (err.code) {
        code = err.code;
    }

    if (err.message) {
        message = err.message;
    }
    res.status(code).json({ message: message });
});

////////////////////////////

try{
    mdbconnect();
    pgconnect();
    app.listen(port, () =>  {
        console.log(`Auth API listening on port ${port}`);
    });
}
catch (err) {
    console.error(err);
}