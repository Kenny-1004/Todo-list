const { StatusCodes } = require('http-status-codes')
const {getProvider} = require('../providers/get.provider.js')

async function handleGetUser(req, res) {
    try {
        const user = await getProvider(req, res)
        res.status(StatusCodes.OK).json({
            data: {
                id: user.id,
                username: user.username,
                tasks: user.tasks
            }
        })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errMessage: err
        })
    }
}

module.exports = {handleGetUser}