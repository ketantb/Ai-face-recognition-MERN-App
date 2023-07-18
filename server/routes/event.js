const express = require('express')
const router = express.Router()
const Event = require('../models/event')

router.post('/create-event', async (req, res) => {
    try {
        const eventName = req.body.eventName;
        const eventDate = req.body.eventDate;
        const newEvent = await Event.create(req.body)
        console.log(newEvent);
        res.status(200).json({ success: true, message: newEvent })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
})

router.get('/event-details/:eventName/:eventId', async (req, res) => {
    const { eventId } = (req.params)
    try {
        const eventDetails = await Event.findById(eventId)
        console.log(eventDetails)
        res.status(200).json({ success: true, message: eventDetails })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
})

router.put('/edit-event-details/:eventName/:eventId', async (req, res) => {
    const { eventId } = (req.params)
    try {
        const editedEventDetails = await Event.findByIdAndUpdate(eventId, req.body)
        console.log(editedEventDetails)
        res.status(200).json({ success: true, message: eventDetails })
        //we cannot find any product in database
        if (!hotelBook) {
            return res.status(404).json({ message: `cannot find any event with id ${id}` });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
})

module.exports = router;