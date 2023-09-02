// ---------------------------
// Module: Authentication controllers
// ---------------------------
// Contains functions related to authentication

const jwt = require('jsonwebtoken');
const { throwError } = require('../helpers/error');
const bcrypt = require('bcrypt');
const authpg = require('../data/pg-actions');
const authmongo = require('../data/mongo-actions');


///////////////////// Helper Functions /////////////////////

/**
 * Generates an accessToken
 * * @param {*} user user data
 * @returns {string} accessToken
 */
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
};

/**
 * Generates a refreshToken
 * @param {*} user user data
 * @returns {string} refreshToken
 */
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN);
};

const getToken = async (req, res) => {
    //Retrieve accessToken and refreshToken

    //Process header
    const username = req.body.username;
    const user = { name: username };

    //Create accessToken and refreshToken
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    //---Code to store refreshToken goes here (maybe)

    
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
};

/**
 * 
 * @param {*} token String
 * @returns {}
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN);
    } catch (err) {
        if (err.name == 'TokenExpiredError') {
            throwError('Token has expired', 401);
        } else {
            throwError('Could not verify token', 403);
        };
    };
};

const verifyPassword = async (rawpwd, hashedpwd) => {
    //Verifies password
    return bcrypt.compare(rawpwd, hashedpwd, (err, result) => {
        if (err) throwError('Failed to verify password', 500);

        return result;
    });
};

////////////////////////////////////////

const signup = async (req, res) => {
    const username = req.body.username;
    const rawpwd = req.body.password;

    const data = {
        registering: "true",
        username: username,
        password: rawpwd
    };

    try{
        //Hash password
        const hashedpwd = await bcrypt.hash(rawpwd, 12);

        //Save account
        authpg.saveAccount(username, hashedpwd);

        //Call login
        fetch('http://localhost:5002/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
       });
    }
    catch (err) {
        authpg.deleteUser(username);
        throwError("Failed to register user", 500);    
    };
};

const login = async (req, res, next) => {
    //Sign Up Flag
    const registering = req.body.registering;

    //Account details
    const username = req.body.username;
    const rawpassword = req.body.password;
    const user = { name: username };

    try {
        //Create tokens
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        if (registering == "true") {
            //Login from Sign Up
            //Store tokens to DB
            authpg.saveAccessToken(username, accessToken);
            authmongo.saveRefreshToken(username, refreshToken);
            console.log("Test");
            return res.status(200).json({ accessToken: accessToken });
        }; 

        //Verifies username
        authpg.findUser(username)
        .then((result) => {
            if (result == false) {
                return res.status(401).json({ message: "Credentials do not match" });
            }
        })
        .catch((err) => { return throwError(err, 500); });

        //Verifies password
        authpg.verifyPassword(username, rawpassword)
        .then((result) => {
            console.log(result);
            if (result === false) {
                console.log(result);
                return res.status(401).json({ message: "Credentials do not match" });
            }
            else {
                return res.status(200).json({ accessToken: accessToken });
            }
        })
        .catch((err) => { return throwError(err, 500); });
    }
    catch (err) {
        next(err);
    };
};

const logout = async (req, res) => {
    const accessToken = req.body.accessToken;
    const username = req.body.username;

    try {
        //Verify access token
        verifyToken(accessToken);

        //Delete tokens
        authmongo.deleteRefreshToken(username);
        authpg.deleteAccessToken(username);

        return res.sendStatus(200);
    } catch (err) {
        next(err);
    };
};

const regenerateToken = async (req, res) => {
    //Creates new accessToken from refreshToken

    const refreshToken = authmongo.getRefreshToken();
    
    if (refreshToken == null) return res.sendStatus(401);
    
    //Code for checking refreshToken authenticity
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) { //If refreshToken is invalid
            //Delete tokens (logout)
            authmongo.deleteRefreshToken(username);
            authpg.deleteAccessToken(username);

            res.sendStatus(403);
        };

        const accessToken = createAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
};

module.exports = { signup, login, logout, regenerateToken, createAccessToken };