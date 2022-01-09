// Config, Errors
const HttpErrorHandler = require('../utils/errorHandler')

// MongoDB Models
const Order = require('../models/Order')

module.exports.getAll = async (req, res) => {

    try {

        // Get User Id From Request User Object Who Created With Passport
        const {id} = req.user

        // Create Some Filters For Order
        // Default Filter Will be By User Id
        const query = {user: id}

        /**
         * Filters By Date (Start, End)
         * Filters By Current Order Number
         * */
        const {start, end, offset, limit, order} = req.query

        if (start) {
            query.date = {
                // Mongoose Greater Than or Equals
                $gte: start
            }
        }

        if (end) {
            // Check If query Object Have Date
            if (!query.date) {
                query.date = {}
            }

            // Mongoose Less Than or Equals
            query.date['$lte'] = end
        }

        if(order){
            query.order = +order
        }

        /**
         * Get All Orders By Some Query
         * Sorting By Date
         * Skip By Offset
         * Limit By limit
         * (URL EXAMPLE) http://localhost:5000/api/category?start=startDate&end=endDate&offset=1&limit=5&order=orderNumber
        */
        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+offset)
            .limit(+limit)

        res.status(200).json(orders)

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}

module.exports.create = async (req, res) => {

    try {

        // Get The List From Request Body
        const {list} = req.body

        // Get User Id From Request User Object Who Created With Passport
        const {id} = req.user

        // First We Must Get The Last Order By User Id And
        // Sort By Date
        const lastOrder = await Order
            .findOne({user: id})
            .sort({date: -1})

        // Then Take Order Number
        const maxOrder = lastOrder ? lastOrder.order : 0

        // Create Order
        const order = await new Order({
            list,
            user: id,
            order: maxOrder + 1
        })

        res.status(201).json(order)

    } catch (e) {

        // If There Are Any Error With Server
        HttpErrorHandler(res, e)

    }
}
