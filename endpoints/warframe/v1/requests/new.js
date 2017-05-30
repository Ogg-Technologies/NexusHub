'use strict'

const Endpoint = require(blitz.config.core.endpointParent)
const Statistics = new(require(__dirname + "/../items/statistics.js"))

/**
 * Contains multi-purpose functions for child-methods and provides default values
 */
class Request extends Endpoint {
    constructor(db) {
        super(db)

        // Modify schema
        this.schema.method = "POST"
        this.schema.scope = "root-read-write"
    }

    /**
     * Main method which is called by MethoHandler on request
     */
    main(request) {
        return new Promise((resolve, reject) => {

            // Modify request
            request.createdAt = new Date()
            request.price = request.price === "null" ? null : request.price

            // Get statistics for item
            Statistics.url = ("/warframe/v1/items/" + request.item + "/statistics").replace(" ", "%20")
            Statistics.main(request.item, "", new Date().getTime(), new Date(new Date().setDate(new Date().getDate() - 7)).getTime(), 7)

            // Publish changes
            .then((data) => {
                this.publish("/warframe/v1/items/" + request.item + "/statistics", data)
            })

            // Insert and resolve
            this.db.collection("requests").insertOne(request)
            resolve("Request processed. (" + JSON.stringify(request) + ")")
        })
    }
}

module.exports = Request