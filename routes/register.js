const User = require('../src/models/User')

const register = async (body) => {
    const user = new User(body)

    try {
        await user.save()
        return {
            status: 201,
            user
        }
    } catch (e){
        return e
    }
}

module.exports = register