const { StatusCodes } = require('http-status-codes')
const { deleteTaskProvider } = require('../providers/delete.provider.js')

async function handleDeleteTask(req, res) {
    try {
        const response = await deleteTaskProvider(req, res)
        res.status(StatusCodes.OK).json({
            message: response
        })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errMessage: err.message
        })
    }
}
module.exports = {handleDeleteTask}