require("dotenv").config();
const express = require('express');
const authRoutes = require('../routes/auth-routes');
const { pgconnect } = require('../data/pg-actions');
const { mdbconnect } = require('../data/mongo-actions');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;

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
    //mdbconnect();
    pgconnect();
    app.listen(port, () =>  {
        console.log(`Auth API listening on port ${port}`);
    });
}
catch (err) {
    console.error(err);
}