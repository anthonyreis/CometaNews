const mongoose = require('mongoose')
const validator = require('validator')

const newsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email inválido')
        }
    }
  },
  date: { type: Date, default: Date.now}
});

newsLetterSchema.statics.findByCredentials = async (email) => {
  var emailNewsLetter = await NewsLetter.findOne({ email })

  if (emailNewsLetter) {
     return {
       status: 400,
       error: 'E-mail já cadastrado no NewsLetter!'
     }
  }

  return {
    status: 404
  }
}
const NewsLetter = mongoose.model('NewsLetter', newsLetterSchema)

module.exports = NewsLetter