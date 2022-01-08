// Config, Errors
const HttpErrorHandler = require('../utils/errorHandler')

// MongoDB Models
const Position = require('../models/Postion')

module.exports.getByCategoryId = async (req, res) => {
    try {
        // Get Category Id From Request Params
        const {categoryId} = req.params

        // Get User Id From Request User Object Who Created With Passport
        const {id} = req.user

        // Get All Positions By Category Id And User Id
        const positions = await Position.find({
            category: categoryId,
            user: id
        })

        res.status(200).json(positions)

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}

module.exports.create = async (req, res) => {
    try {

        // Get Name Cost Category From Requests Body
        const {name, cost, category} = req.body

        // Get User Id From Request User Object Who Created With Passport
        const {id} = req.user

        // Create New Position
        const position = await new Position({
            name,
            cost,
            category,
            user: id
        }).save()

        res.status(201).json(position)

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}

module.exports.remove = async (req, res) => {
    try {

        // Get Id Current Id
        const {id} = req.params

        // Find And Remove Position By Id
        await Position.findByIdAndRemove(id)

        res.status(200).json({
            message: 'Position Was Deleted'
        })

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}

module.exports.update = async (req, res) => {
    try {

        // Get Id Current Id
        const {id} = req.params

        // Update Position By Id and Return Updated Position
        const position = await Position.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true}
        )

        res.status(200).json(position)
    } catch (e) {
        // If There Are Any Error With Server
        HttpErrorHandler(res, e)
    }
}
