const express = require('express');
const health = express();


health.get('/', async (req, res, next) => {
    res.send({
        message:'HEALTHY'
    })
})

module.exports = health; 
