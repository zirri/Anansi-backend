const express = require('express');
const router = express.Router();

//routes
router.get('/user/:userId',(req, res) => {
    res.send('library ok')
})

module.exports = router;