const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    url:{
        type: String
    },
    code:{
        type: String,
        required: true
    },
    difficulty:{
        type: String
    },
    notes:{
        type: String
    }

})

module.exports = Code = mongoose.model('Code', CodeSchema );