// ---------------------------
// Module: Message Helper
// ---------------------------
// Contains functions for error handling

const throwError = (msg, code) => {
    //Creates and throws error
        const error = new Error(msg);
        error.code = code;
        throw error;
    };
    
    exports.throwError = throwError;