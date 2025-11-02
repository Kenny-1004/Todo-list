
const { Schema, model } = require('mongoose');
const taskSchema = require('./tasks.schema.js')

const usersSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minLength: [10, "Username must be atleast 10 characters"],
        maxLength: [25, "Username must be only 25 characters"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [10, "Password must be atleast 10 characters"],
        maxLength: [25, "Password must be only 25 characters"],
    },
    tasks: [taskSchema]
}, { timestamps: true, versionKey: false })

const User = model("User", usersSchema)
module.exports = User