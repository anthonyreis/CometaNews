const NewsLetter = require('../src/models/newsletter')

const register = async (email, callback) => {
    try {
        const newsLetter = await NewsLetter.findByCredentials(email.email)
        if (newsLetter.status == 404) {
            const cadastro = new NewsLetter(email)
            await cadastro.save()
            return callback(undefined, cadastro)
        }

        callback(undefined, newsLetter)
    }catch (e) {
       callback(e, undefined)
    }
}

module.exports = register