const User = require('../Schema/users.schema.js')

async function loginProvider(req, res) {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if(!user) throw new Error("User doesn't exist")
        if (user.password !== password) throw new Error("Invalid password")
        console.log("Login successful");
        return user

    } catch (error) {
        throw error
    }
}

async function createUserProvider(req, res) {
    try {
        const { username, password } = req.body
        const newUser = new User({
            username,
            password
        })
        const user = await User.findOne({ username })
        if (user) throw new Error("Username already exists")
        return await newUser.save()
    } catch (err) {
        throw err
    }
}

async function createTaskProvider(req, res) {
    try {
        const userId = req.query.id
        const {title, description, status, priority, dueDate} = req.body
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("Something went wrong")
        }
        user.tasks.push({
            title,
            description,
            status,
            priority,
            dueDate: new Date(dueDate)
        })
        return await user.save()
    } catch (err) {
        throw err
    }
}

module.exports = {
    loginProvider,
    createUserProvider,
    createTaskProvider
}