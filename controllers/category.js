// Config, Errors
const HttpErrorHandler = require('../utils/errorHandler')

// MongoDB Models
const Category = require('../models/Category')
const Position = require('../models/Postion')

module.exports.getAll = async (req, res) => {
    try {

        // Get User Id From Request User Object Who Created With Passport
        const {id} = req.user

        //Get All Categories By User Id
        const categories = await Category.find({user: id})

        res.status(200).json(categories)

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}

module.exports.getById = async (req, res) => {
    try {

        // Get Id From Request Params
        const {id} = req.params

        // Get Category By Id From Request Params
        const category = await Category.findById({_id: id})

        res.status(200).json(category)

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}

module.exports.remove = async (req, res) => {
    try {

        // Get Id From Request Params
        const {id} = req.params

        await Category.findByIdAndRemove(id)
        await Position.findOneAndRemove({category: id})

        res.status(200).json({
            message: 'Category Was Deleted'
        })

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}

module.exports.create = async (req, res) => {
    try {

        // Get User Id From Request User Object Who Created With Passport
        const {id} = req.user

        // Get Name From Requests Body
        const {name} = req.body

        // Get The Path To The File If It Exists
        const filePath = req.file ? req.file.path : ''

        // Create New Category
        const category = await new Category({
            name,
            user: id,
            imageSrc: filePath
        }).save()

        res.status(201).json(category)

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}

module.exports.update = async (req, res) => {
    try {

        // Get Id From Request Params
        const {id} = req.params

        // Get Name From Requests Body
        const {name} = req.body

        const categoryUpdate = {
            name
        }

        // Get The Path To The File If It Exists
        if(req.file) categoryUpdate.imageSrc = req.file.path

        const category = await Category.findByIdAndUpdate(
            id,
            {$set: categoryUpdate},
            {new: true}

        )

        res.status(200).json(category)

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}