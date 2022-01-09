const mongoose = require("mongoose");

// initialization App
const app = require('./app')

// Config, Error
const keys = require("./config/keys");
const HttpErrorHandler = require('./utils/errorHandler')

// Create Port From Env Or By Default 5000
const PORT = process.env.PORT || 5000


// Create Start Server Function With Validate The Errors
const StartServer = () => {
    try {

        // MongoDb Connect Config
        mongoose.connect(keys.mongoURI)
            .then(() => console.log('MongoDB Was Connected'))

        app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(null, e)

    }
}

StartServer()


