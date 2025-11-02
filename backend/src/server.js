const express = require('express');
const cors = require('cors');
const fs = require('fs')
const path = require('path')
const morgan = require('morgan');
const mongoose = require('mongoose');
const responseFormatter = require('./Users/middleware/reponseFormatter.js')
const usersRouter = require('./Users/users.router.js')
const { StatusCodes } = require('http-status-codes');

const app = express();
const PORT = process.env.PORT || 5006;

app.use(express.json());
app.use(cors())


// let localStream = fs.createWriteStream(
//     path.join(__dirname, "..", "acces.log"), {
//         flags: "a"
// })
// app.use(morgan("combined", {
//     stream: localStream
// }))
app.use(morgan("dev"))


app.use(responseFormatter)
// Routes
app.use('/', usersRouter)

// Handle resource error
app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: "Something went wrong"
    })
})

async function bootstrap() {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/",
            {dbName: "Users"}
        )
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log("App listening on port: ", PORT);
        })
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

bootstrap()