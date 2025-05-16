const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// GET /api/users
router.get('/user/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    
    User.findById(id)
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
        })
        .catch(err => {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Internal server error' });
        });
});

module.exports = router;