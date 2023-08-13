// ---------------------------
// Module: Authentication controllers
// ---------------------------
// Contains functions related to authentication

const jwt = require('jsonwebtoken');
const { throwError } = require('../helpers/error');
const bcrypt = require('bcrypt');
const authpg = require('../data/pg-actions');
const authmongo = require('../data/mongo-actions');


///////////////////// TOKENS /////////////////////

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

const verifyToken = async (req, res) => {
    //Verify accessToken
    const token = req.body.accessToken;

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN);
        res.status(200).json({});
    } catch (err) {
        if (err.name == 'TokenExpiredError') {
            throwError('Token has expired', 401);
        } else {
            throwError('Could not verify token', 403);
        };
    };
};

const remove = () => {
    //Delete accessToken from PG
            res.status(204);
};

///////////////////// PASSWORDS /////////////////////

/**
 * Hashes raw passwords
 * @returns {string} Hashed Password
 */
const createHashedPassword = async (password) => {
    const hashedpwd = await bcrypt.hash(password, 12);
    console.log("Hashed password: " + hashedpwd);
    return hashedpwd;

    // bcrypt.hash(password,12).then(
    //     (data) => {
    //         return data;
    //     }
    // ).catch(
    //     (err) => {
    //         throwError('Failed to secure password', 500)
    //     }
    // );
};

// const getHashedPassword = async (req, res) => {
//     //Retrieves hashed password
//     const rawpwd = req.body.password;

//     try {
//         const hashedpwd = createHashPassword(rawpwd);
//         res.status(200).json({ hash: hashedpwd });
//     } catch (err) {
//         next(err);
//     };
// };

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

    try{
        //Hash password
        const hashedpwd = await bcrypt.hash(rawpwd, 12);

        authpg.saveAccount(username, hashedpwd);
        //Call login function
        return res.sendStatus(200);
    }
    catch (err) {
        throwError("Failed to register user", 500);    
    }
};

const login = async (req, res, next) => {
    //Sign Up Flag
    const registering = req.body.registering;

    //Account details
    const username = req.body.username;
    const rawpassword = req.body.password;
    const user = { name: username };

    //Tokens
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    try {
        //Store tokens to DB
        await authpg.saveAccessToken(username, accessToken);
        authmongo.saveRefreshToken(username, refreshToken);

        if (registering == true) {
            //Login from Sign Up
            return res.send(200).json({ accessToken: accessToken });
        } else {
            const hashedpwd = await authpg.getHashedPassword(username);
            
            // const valid = verifyPassword(rawpassword, hashedpwd);

            // if (valid == true) {
            //     res.status(200).json({ accessToken: accessToken });
            // } else {
            //     res.status(401).json({ message: "Invalid credentials" });
            // };
        };
    }
    catch (err) {
        next(err);
    };
};

const logout = async (req, res) => {
    const username = req.body.username;

    try {
        //Delete tokens
        authmongo.deleteRefreshToken(username);
        authpg.deleteAccessToken(username);

        return res.sendStatus(200);
    } catch (err) {
        throwError("Failed to logout", 500);
    }
};

const regenerateToken = async (req, res) => {
    //Creates new accessToken from refreshToken

    const refreshToken = authmongo.getRefreshToken();
    
    if (refreshToken == null) return res.sendStatus(401);
    //Code for checking refreshToken authenticity

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
            res.sendStatus(403);
            //Call logout;
        };

        const accessToken = createAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
};

module.exports = { signup, login, logout, regenerateToken, createAccessToken };