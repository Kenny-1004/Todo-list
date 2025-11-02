const { StatusCodes } = require('http-status-codes')
const User = require('../Schema/users.schema.js')


async function updateTaskProvider(req, res) {
    try {
        const { userId, taskId } = req.query
        const updates = req.body
        const allowedFields = [
            "title",
            "description",
            "status",
            "priority",
            "dueDate"
        ];
        const isValid = Object.keys(updates).every((key) => allowedFields.includes(key))
        // checks if task key matches the schema
        if (!isValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errMessage: "Invalid fields in request body"
            })
        };
        const user = await User.findById(userId)
        const task = user.tasks.id(taskId)
        // checks if task is not found
        if (!task) {
            return res.status(StatusCodes.NOT_FOUND).json("Task not found")
        }

        Object.keys(updates).forEach((key) => {
            task[key] = updates[key]
        })

        await user.save()
        return task
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Server error")
    }
}

module.exports = {updateTaskProvider}