const { StatusCodes } = require("http-status-codes");
const User = require("../Schema/users.schema.js");

async function deleteTaskProvider(req, res) {
    try {
        const { userId, taskId } = req.query
        const userFound = await User.findById(userId)
        if (!userFound) {
            throw new Error("User not found")
        }
        const taskFound = userFound.tasks.id(taskId)
        if (!taskFound) {
            throw new Error("Task not found")
        }
        taskFound.deleteOne()
        await userFound.save()
        return "Task Deleted Successfully"
    } catch (err) {
        throw err
    }
}

module.exports = {deleteTaskProvider}