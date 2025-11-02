const User = require('../Schema/users.schema.js')

async function getProvider(req, res) {
    try {
        const userId = req.query.id
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User does not exist")
        }
        return user
    } catch (err) {
        throw err
    }
}

module.exports = {getProvider}