const { Schema } = require('mongoose')

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true,
        maxLength: [100, "Title cannot be longer than 100 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Description cannot be longer than 500 characters"]
    },
    status: {
        type: String,
        enum: ["todo", "inProgress", "completed"],
        default: "todo"
    },
    priority: {
        type: String,
        enum: ["low", "normal", "high"],
        default: "normal"
    },
    dueDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = taskSchema