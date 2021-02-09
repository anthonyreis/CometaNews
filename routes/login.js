const User = require('../src/models/User')

const login = async (email, password) => {
    try {
        const user = await User.findByCredentials(email, password)
        return {
            status: 200,
            user
        }
    }catch (e) {
        return e
    }
}

module.exports = login