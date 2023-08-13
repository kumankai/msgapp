//-----------
// Module for Messsage actions
//-----------
//Contains functions for messaging

const chatToLog = (data) => {
    //For storing in chat history
    const string = `${data.timestamp}-${data.username}-${data.message}`;
    return string;
};

module.exports = { chatToLog };