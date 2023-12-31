const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const participant = new mongoose.Schema({
    _id:{
        type: String,
        default: uuidv4
    },
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Participant',participant,'CNR')