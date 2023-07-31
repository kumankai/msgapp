const express = require('express');

const authActions = require('../controllers/auth-actions');

const router = express.Router();

router.post('/token', authActions.getToken);

router.post('/verify-token', authActions.verifyToken);

module.exports = router;