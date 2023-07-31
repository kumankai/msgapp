// ---------------------------
// Module: Authentication Helper
// ---------------------------
// Contains functions for error handling

const throwError = (msg, code) => {
    const error = new Error(msg);
    error.code = code;
    throw error;
};

exports.throwError = throwError;