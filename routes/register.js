const User = require('../src/models/User')

const register = async (body) => {
    const user = new User(body)

    try {
        await user.save().then(() => {
            return {
                status: 201,
                user
            }
        })
    } catch (e){
        console.log(e)
    }
}

module.exports = register