//--------------
// Module for postgres actions

require("dotenv").config();
const { Client } = require('pg');
const { throwError } = require('../helpers/error');

const PG = new Client({
    host: 'localhost', //process.env.PG_ENDPOINT,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    password: process.env.PG_PASS,
    database: process.env.PG_DB
});

const pgconnect = async () => {
    try {
        await PG.connect();
        console.log(`Connected to Postgres port:${process.env.PG_PORT}`);
    } catch (err) {
        throwError(err, 500);
    };
};

const pgdisconnect = async () => {
    await PG.end();
    console.log('Postgres connection ended');
};

/////////////////////////

const getHashedPassword = async (username) => {
    await pgconnect();

    PG.query(`SELECT PASSWORD FROM USERS WHERE USERNAME='${username}'`, (err,result) => {
        if (err) throwError(err, 500);
        console.log(result);

        pgdisconnect();
        return result;
    });

};

const saveAccount = async (username, password) => {
    pgconnect();

    try{
        PG.query(`INSERT INTO USERS(USERNAME, PASSWORD) VALUES ('${username}', '${password}')`, (err) => {
            if (err) {
                pgdisconnect();
                throwError(err, 400); //PG could not query
            }
            console.log("Account successfully saved");
            pgdisconnect();
            return;
        });
        
    } catch (err) {
        pgdisconnect();
        throwError("Failed to register user", 500);
    };
};

const saveAccessToken = async (username, accessToken) => {
    await pgconnect();

    try{
        PG.query(`UPDATE USERS SET ACCESSTOKEN='${accessToken}' WHERE USERNAME='${username}'`, (err) => {
            if (err) throwError(err, 500);
        });
        console.log("Token bas been saved");
        await pgdisconnect();
    } catch (err) {
        throwError("Failed to save accessToken", 500);
    };
};

const deleteAccessToken = (username) => {
    try{
        pgconnect();

        PG.query(`DELETE ACCESSTOKEN FROM USERS WHERE USERNAME='${username}'`);

        PG.end();
    } catch (err) {
        throwError("Failed to delete accessToken", 500);
    }
}

module.exports = {
    getHashedPassword,
    saveAccount,
    saveAccessToken,
    deleteAccessToken, };