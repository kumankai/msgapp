//-----------
//Module for postgres actions
//-----------
//Contains functions related to storing message related data

const {Client} = require('pg');
const { throwError } = require('../helpers/error');

const PG = new Client({
    host: 'localhospt', //process.env.PG_ENDPOINT,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    password: process.env.PG_PASS,
    database: 'chat' //process.env.PG_DB
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

///////////////////////////////////

const saveChat = async (log, room) => {
    pgconnect()

    PG.query(`INSERT INTO ${room}(HISTORY) VALUES('${log}')`);

    try {
        pgdisconnect();
    } catch (err) {
        PG.query('DELETE')
    }
};