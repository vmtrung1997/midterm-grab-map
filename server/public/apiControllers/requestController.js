const mongoose = require('mongoose');
const RequestGrab = require('../models/requestGrab');
const express = require('express');
const router = express.Router();

var mongoURI = 'mongodb://localhost:27017/grab';
mongoose.connect(mongoURI, { useNewUrlParser: true } );

router.post('/create_request', (req, res) => {
    try {
        let i_request = new RequestGrab({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            note: req.body.note,
            date: new Date(),
            idDriver: "",
            state: "not_locate"
        })
        i_request.save((err,result) => {
            if (err) return console.log(err);
            console.log(result.name + " add to db");
        })
    } catch (err) {
        console.log(err);
    }

})

module.exports = router;