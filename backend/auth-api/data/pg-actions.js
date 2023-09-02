//--------------
// Module for postgres actions

require("dotenv").config();
const { Client } = require('pg');
const { throwError } = require('../helpers/error');
const bcrypt = require('bcrypt');

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
    console.log('Postgres successfully disconnected');
};

/////////////////////////

const findUser = async (username) => {
    return new Promise((resolve, reject) => {
        try {
            PG.query(`SELECT * FROM USERS WHERE USERNAME='${username}'`, (err, result) => {
                if (err) reject(err);
    
                if (result.rowCount == 0) {
                    resolve(false);
                    return;
                }

                resolve(true);
                return;
            });
        } catch (err) {
            reject(err);
            return;
        }
    })
};

const verifyPassword = async (username, rawpwd) => {
    return new Promise((resolve, reject) => {
        try {
            PG.query(`SELECT PASSWORD FROM USERS WHERE USERNAME='${username}'`, (err, result) => {
                if (err) reject(err);

                const hashedpwd = result.rows[0].password;
                bcrypt.compare(rawpwd, hashedpwd, (err, result) => {
                    if (err) {
                        reject();
                        return;
                    }

                    resolve(result);
                    return;
                });
            });
        } catch (err) {
            reject(err);
        }
    });
}

const saveAccount = async (username, password) => {
    //Save user in database
    try{
        PG.query(`INSERT INTO USERS(USERNAME, PASSWORD) VALUES ('${username}', '${password}')`, (err) => {
            if (err) {
                throwError(err, 400); //PG could not query
            }
            console.log("Account successfully saved");
            return;
        });
        
    } catch (err) {
        throwError("Failed to register user", 500);
    };
};

const saveAccessToken = async (username, accessToken) => {
    //Save user's accesstoken in database
    try{
        PG.query(`UPDATE USERS SET ACCESSTOKEN='${accessToken}' WHERE USERNAME='${username}'`, (err) => {
            if (err) throwError(err, 500);
        });
        console.log("Token successfully saved");
    } catch (err) {
        throwError("Failed to save accessToken", 500);
    };
};

const deleteAccessToken = async (username) => {
    //Delete accesstoken in database
    try{
        PG.query(`DELETE ACCESSTOKEN FROM USERS WHERE USERNAME='${username}'`, (err) => {
            if (err) throwError(err, 500);
        });
        console.log("Token successfully deleted");
    } catch (err) {
        throwError("Failed to delete accessToken", 500);
    };
};

const deleteUser = async (username) => {
    //Delete user from database
    try{
        PG.query(`DELETE FROM USERS WHERE USERNAME='${username}'`, (err) => {
            if (err) throwError(err, 500);
        });
        console.log("User successfully deleted");
    } catch (err) {
        throwError("Failed to delete user", 500);
    };
};

module.exports = {
    pgconnect,
    findUser,
    verifyPassword,
    saveAccount,
    saveAccessToken,
    deleteAccessToken,
    deleteUser,
};