require('dotenv').config()
const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { response } = require('express')

function sendOtpMail(email, otp) {
    //send email of booking confirmation
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "harshadaa1997@gmail.com", //process.env.NODEMAILER_EMAIL,
            pass: "pvrwfvhuibgplogr", //req.body.email,
        },
    });

    let mailOptions = {
        from: "harshadaa1997@gmail.com", //process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "OTP verificaion for Hyatt mart",
        text: `
                Hello from Hyatt Mart,
                Verification Code=${otp}
                Thanks.
                `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { error: error };
        } else {
            console.log("Email sent: " + info.response);
            return { success: true, message: info.response };
        }
    });

}

//ROUTE TO GENERATE OTP AND SEND IT TO USER NUMBER THROUGHT SMS
router.post('/user-registration', async (req, res) => {
    try {
        const { mobileNo, email } = req.body
        const emailFoundButNotVerified = await User.findOne({ email, isVerified: false })
        const mobileFoundButNotVerified = await User.findOne({ mobileNo, isVerified: false })
        if (emailFoundButNotVerified) {
            console.log("emailFoundButNotVerified => ", emailFoundButNotVerified)
            sendOtpMail(emailFoundButNotVerified.email, emailFoundButNotVerified.otp)
            return res.status(200).json({ success: false, message: 'user found but not verified' })
        }
        else if (mobileFoundButNotVerified) {
            console.log("mobileFoundButNotVerified => ", mobileFoundButNotVerified)
            sendOtpMail(mobileFoundButNotVerified.email, mobileFoundButNotVerified.otp)
            return res.status(200).json({ success: false, message: 'user found but not verified' })
        }
        const emailFound = await User.findOne({ email })
        const mobileFound = await User.findOne({ mobileNo })
        if (emailFound) {
            console.log(emailFound)
            return res.status(500).json({ success: false, message: 'email already in use' })
        }
        else if (mobileFound) {
            console.log(mobileFound)
            return res.status(500).json({ success: false, message: 'mobile number already in use' })
        }
        else {
            const otp = Math.floor(1000 + Math.random() * 9999).toString().substr(0, 4);
            let password = req.body.password
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)
            password = hashedPassword
            const userData = { mobileNo, email, password, otp: otp }
            const user = await User.create(userData)
            sendOtpMail(email, otp)
            return res.status(200).json({ success: true })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


// ROUTER TO VERIFY OTP
// WHEN YOU ENTER OTP AND SUBMIT
router.post('/verify-otp', async (req, resp) => {
    try {
        const email = req.body.email
        const otp = req.body.otp
        const user = await User.findOne({ email, otp });


        // console.log(user)
        if (user) {
            user.isVerified = true
            await user.save()
            console.log(user)
            resp.json({ sucess: true, message: 'Email verified successfully' })
        }
        else {
            resp.json({ success: false, message: 'Invalid OTP' })
        }
    }
    catch (err) {
        resp.json({ success: false, message: err })
    }
})

//SET PASSWORD
router.post('/set-password', (req, res) => {
    try {
        const { password } = req.body
    }
    catch (err) {
        console.log(err)
    }
})


//sign-in route 
router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email)
        const userData = await User.findOne({ email: email })
        console.log('userData => ', userData)
        if (!userData || email != userData.email) {
            console.log("Invalid Email or Password")
            return res.status(400).send("Invalid Email or Password")
        }
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password)
            if (passwordMatch) {
                const dataTobeSentToFrontend = {
                    _id: userData._id
                }
                const token = jwt.sign(dataTobeSentToFrontend, "secretKey", { expiresIn: 10000 })

                res.status(200).send({
                    success: true,
                    message: 'Signin Successful',
                    data: { token }
                });
            }
            else {
                return res.status(400).send("Invalid Password")
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router