const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName: { type: String },
    eventDate: { type: String },
    eventDescription: { type: String },
    eventCoverPage: { type: String },
    eventImages: [
        {
            image: { type: String },
            published: { type: Boolean, default: false },
        }
    ],
    eventVideoLinks: []
})

const EventModel = mongoose.model('event', eventSchema)
module.exports = EventModel