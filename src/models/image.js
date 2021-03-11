const mongoose = require('mongoose')
 
const imageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    img:{
        data: Buffer,
        contentType: String
    },
    date: { type: Date, default: Date.now}
});

const Image = new mongoose.model('Image', imageSchema)
 
module.exports = Image
