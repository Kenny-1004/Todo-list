const { StatusCodes } = require('http-status-codes')
const { updateTaskProvider } = require('../providers/patch.provider.js')

async function handleUpdateTask(req, res) {
    try {
        const updateResponse = await updateTaskProvider(req, res);
        res.status(StatusCodes.OK).json({
            data: updateResponse
        })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json()
    }
}

module.exports = {handleUpdateTask}