
const {StatusCodes} = require('http-status-codes')
const {loginProvider, createUserProvider, createTaskProvider } = require('../providers/post.provider.js')

async function handleLogin(req, res) {
    try {
        const user = await loginProvider(req, res)
        res.status(StatusCodes.OK).json({
            data: {
                id: user.id,
                username: user.username,
                tasks: user.tasks
            },
            message: "Login successful"
        })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: err.message
        })
    }
}

async function handleCreateUser(req, res) {
    try {
        const createUser = await createUserProvider(req, res)
        res.status(StatusCodes.CREATED).json({
            message: "Successfully created a user",
            data: {
                username: createUser.username,
                createdAt: createUser.createdAt
            }
        })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: err.message
        })
    }
}

async function handleCreateTasks(req, res) {
    try {
        const user = await createTaskProvider(req, res)
        res.status(StatusCodes.CREATED).json({
            message: "Succesfully created a task",
            data: user.tasks
        })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: err.message
        })
    }
}



module.exports = { handleLogin, handleCreateUser, handleCreateTasks }