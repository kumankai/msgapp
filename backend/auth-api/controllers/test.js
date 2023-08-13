// const hash = Buffer.from('test', 'base64');
// btoa("test");
// console.log(hash);
// console.log(Buffer.toString('base64'));

const actions = require('../data/pg-actions');
const authActions = require('../controllers/auth-actions');

const token = authActions.createAccessToken({ name: "Jacob" });
const encoded = authActions.encodeToken(token);
const decoded = authActions.decodeToken(token);

console.log("Access Token: " + token);
console.log("Encoded Token: " + encoded);
console.log("Decoded Token: " + decoded);
//actions.saveAccount("fgdf", "dghjgh");