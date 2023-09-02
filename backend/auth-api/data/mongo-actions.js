const mongoose = require('mongoose');
const { throwError } = require('../helpers/error');
const uri = process.env.URI;

const mdbconnect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        throwError(err, 500);
    }
}

const saveRefreshToken = async (username, refreshToken) => {

};

const getRefreshToken = async (username) => {

};

const deleteRefreshToken = async (username) => {

}

module.exports = { mdbconnect, saveRefreshToken, getRefreshToken, deleteRefreshToken };
