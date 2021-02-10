const User = require('../src/models/user')

const login = async (email, password, callback) => {
    try {
        const user = await User.findByCredentials(email, password)
        callback(undefined, user)
    }catch (e) {
       callback(e, undefined)
    }
}

module.exports = login