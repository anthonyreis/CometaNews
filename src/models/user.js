const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (validator.contains(value.toLowerCase(), 'senha')){
          throw new Error('A senha não pode ter a palavra "senha".')
      }
    }
  },
  date: { type: Date, default: Date.now}
});

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
     return {
       status: 401,
       error: 'Credenciais incorretas!'
     }
  }
  
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return {
      status: 401,
      error: 'Credenciais incorretas!'
    }
  }

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User