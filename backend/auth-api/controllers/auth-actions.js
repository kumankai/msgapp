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
const createToken = (username) => {
    return jwt.sign(username, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
};

const verify = (token) => {
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN);
    } catch (err) {
        if (err.name == 'TokenExpiredError') {
            throwError('Token has expired', 401);
        } else {
            throwError('Could not verify token', 403);
        };
    };
};

const remove = () => {
    res.status(204);
};

const getToken = async (req, res, next) => {
//Retrieves token
    const username = req.body.username;
    const token = createToken({ name: username });

    res.status(200).json({ token });
};

const verifyToken = (req, res) => {
//Verify a token
    const token = req.body.token;

    verify(token);
    res.status(200).json({});
};

exports.getToken = getToken;
exports.verifyToken = verifyToken;