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

router.get('/all-events', async (req, res) => {
    try {
        const allEvents = await Event.find()
        console.log(allEvents)
        res.status(200).json({ success: true, message: allEvents })
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

router.patch('/update-event-images/:eventId', async (req, res) => {
    const { eventId } = req.params
    const newArray = req.body

    // console.log("eventId => ", eventId)
    console.log(req.body)
    try {
        const patchImagesArr = await Event.findByIdAndUpdate(eventId, 
                                                            { eventImages: newArray }, 
                                                            { new: true }) // {new: true } added To return the updated document
        if (!patchImagesArr) {
            return res.status(404).json({ message: 'Item not found' });
        }
        console.log(patchImagesArr)
        return res.json({success: true, ...patchImagesArr});
    }
    catch (error) {
        console.error('Error updating array:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;