const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/verifyToken');

// Protected route for profile
router.get('/userinfo', verifyToken, (req, res) => {
    const { userId, isadmin } = req.user;
    res.status(200).json({ username: userId, authority: isadmin });
});

module.exports = router;