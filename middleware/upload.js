const multer = require('multer')
const moment = require('moment')

// Creating File Destination, And Name Of File
const storage = multer.diskStorage({
    /**
     * cb(error, pathName) => CallBack => Arguments
     * Create Uploads Dir, Else Be Error
     **/
    destination(req, file, cb) {
        cb(null, 'uploads')
    },
    /**
     * cb(error, fileName) => CallBack => Arguments
     * Create New Filename
     **/
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')

        // If There Have Any Other . [ 'Other', '', 'Doc', '', 'jpg' ]
        const type = file.originalname.split('.')

        // If The File Name Is Write With Another Language
        const renameFileName = `upload${moment().format('SSS')}.${type[type.length - 1]}`

        cb(null, `${date}-${renameFileName}`)
    }
})

// Some Filter For Files, Example File Format
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// Some Limits For File, Example File Size
const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})