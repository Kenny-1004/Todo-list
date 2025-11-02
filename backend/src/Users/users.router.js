const express = require('express')
const {handleLogin, handleCreateUser, handleCreateTasks} = require('./controllers/post.controller.js')
const { handleGetUser } = require('./controllers/get.controller.js')
const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes')
const {handleUpdateTask} = require('./controllers/patch.controller.js')
const userValidator = require('./validators/user.validator.js')
const { handleDeleteTask } = require('./controllers/delete.controller.js')
const usersRouter = express.Router()

// Get routes
usersRouter.get('/users', handleGetUser)
//Post Routes
usersRouter.post('/users/register', userValidator, (req, res) => {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            return handleCreateUser(req, res)
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: result.array()
            })
        }
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: err.message
        })
    }
})
usersRouter.post('/users/login', handleLogin)
usersRouter.post('/users/tasks', handleCreateTasks)
// PATCH routes
usersRouter.patch('/users/tasks', handleUpdateTask)
// DELETE routes
usersRouter.delete('/users/tasks', handleDeleteTask)
usersRouter.delete('/users', (req, res) => {
    res.status(StatusCodes.OK).json()
})


module.exports = usersRouter