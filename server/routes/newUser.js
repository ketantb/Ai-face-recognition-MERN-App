require('dotenv').config()
const router = require('express').Router()
const { body, validationResult } = require('express-validator')

const User = require('../models/user')


//ROUTE TO GENERATE OTP AND SEND IT TO USER NUMBER THROUGHT SMS
router.post('/user', [
    body('mobileNo').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be of 10 digits')
],
    async (req, resp) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return resp.json({ success: true, errorArr: errors.array() })
        }

        try {
            const mobileNo = req.body.mobileNo
            const otp = Math.floor(1000 + Math.random() * 9999).toString()  //otp between 1000 and 9999
            const user = await User.findOneAndUpdate({ mobileNo }, { new: true, upsert: true })
            // if (!user.isVerified) {

            //     resp.json({ success: true, message: 'user verified successfully', user: user })
            // }
            // else {
            //     resp.json({ success: false, message: 'Invalid otp' })
            // }
            resp.json({ success: true, message: 'otp sent successfully', user: user })
        }
        catch (err) {
            resp.json({ sucess: false, message: err })
        }
    })

    
//ROUTER TO VERIFY OTP
//WHEN YOU ENTER OTP AND SUBMIT
router.post('/verify-otp', async (req, resp) => {
    try {
        const mobileNo = req.body.mobileNo
        const otp = req.body.otp
        const user = await User.findOne({ mobileNo, otp });

        if (user) {
            user.isVerified = true
            await user.save()
            resp.json({ sucess: true, message: 'Mobile number verified successfully' })
        }
        else {
            resp.json({ success: false, message: 'Invalid OTP' })
        }
    }
    catch (err) {
        resp.json({ success: false, message: err })
    }
})

module.exports = router