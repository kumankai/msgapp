// ---------------------------
// Module: Authentication controllers
// ---------------------------
// Contains functions related to authentication

const jwt = require('jsonwebtoken');
const { throwError } = require('../helpers/error');


/**
 * Generates a token
 * @returns {string} Token
 */
const createAccessToken = (username) => {
    return jwt.sign(username, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
};

const getToken = async (req, res) => {
//Generate accessToken and refreshToken

    //Process header
    const username = req.body.username;
    const user = { name: username };

    //Create accessToken and refreshToken
    const accessToken = createAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);

    //---Code to store refreshToken goes here (maybe)

    
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
};

const verifyToken = (req, res) => {
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

const regenerateToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    
    if (refreshToken == null) return res.sendStatus(401);
    //Code for checking refreshToken authenticity

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = createAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
}

const remove = () => {
//Delete accessToken from PG
        res.status(204);
    };

exports.getToken = getToken;
exports.verifyToken = verifyToken;
exports.regenerateToken = regenerateToken;