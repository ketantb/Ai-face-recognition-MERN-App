import React, { useState } from 'react'
import './Signin.css'
import { Button, Box, TextField } from '@mui/material'
import { Icon } from 'react-icons-kit'
import { cross } from 'react-icons-kit/icomoon/cross'
import { useNavigate } from 'react-router-dom';
import firebaseApp from './firebase_config'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(firebaseApp);
const Signin = () => {
    const navigate = useNavigate()

    const [mobileno, setMobileno] = useState(null)
    const [mobilenoBox, setMobilenoBox] = useState(false)
    const mobilenoBtnClick = () => {
        setMobilenoBox(true)
    }


    const [otp, setOtp] = useState(null)
    const [otpBox, setOtpBox] = useState(false)

    //HANDLE NEXT AFTER SUCCESSFUL OTP VERIFICATION
    const handleSendOtp = () => {
        console.log(mobileno)
        setOtpBox(true)
        let countryCode = "+91"
        let mobileNumber = (Number(countryCode + mobileno))

        // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        //     'size': 'normal',
        //     'callback': (response) => {
        //         // reCAPTCHA solved, allow signInWithPhoneNumber.
        //         // ...
        //     },
        //     'expired-callback': () => {
        //         // Response expired. Ask user to solve reCAPTCHA again.
        //         // ...
        //     }
        // }, auth);
    }

    //HANDLE OTP
    const handleNext = () => {
        console.log(otp)
        // navigate('/dashboard-details')
        navigate('/home-page')
        let countryCode = "+91"
        const phoneNumber = (Number(countryCode + mobileno))
        // const appVerifier = window.recaptchaVerifier;
        // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        //     .then((confirmationResult) => {
        //         // SMS sent. Prompt user to type the code from the message, then sign the
        //         // user in with confirmationResult.confirm(code).
        //         window.confirmationResult = confirmationResult;
        //         // ...
        //     }).catch((error) => {
        //         // Error; SMS not sent
        //         // ...
        //     });

    }


    //CONFIGURE CAPTCHA  (INVISIBLE)


    return (
        <div className='container signin-wrapper'>
            {(!mobilenoBox) ? (
                <>
                    <h4>BUSINESS WITH HAYAT MART</h4>
                    <h5>Sign In to access your Dashboard</h5>
                    <div className='form-wrapper'>

                        <Box className='mobilenobtn-wrapper'>
                            <Button variant="contained" className='btn' onClick={mobilenoBtnClick}>Mobile Number Login</Button>
                        </Box>
                        <div className='or-line-wrapper'>
                            <div className='line-wrapper'>
                                <span className='line1'></span>
                                <span className='text'>OR</span>
                                <span className='line2'></span>
                            </div>
                        </div>
                        <Box className='googlesignin-wrapper'>
                            <Button variant="contained" className='btn'>CONTINUE WITH GOOGLE</Button>
                        </Box>
                    </div>
                </>) : (
                <>
                    <form >
                        <div className='icon-wrapper'>
                            <Icon icon={cross} size={15} className='cross-icon'
                                onClick={() => { setMobilenoBox(false) }}></Icon>
                        </div>
                        <Box className='mobileno-input-wrapper'>
                            <TextField className='mobileno-inputbox'
                                id="outlined-number"
                                label="Enter Mobile Number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                name='mobileno' value={mobileno} onChange={(e) => setMobileno(e.target.value)}
                            />
                        </Box>
                        {otpBox ? (
                            <>
                                <Box className='otp-input-wrapper'>
                                    <TextField className='otp-inputbox'
                                        id="outlined-number"
                                        label="Enter OTP"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                        name='otp' value={otp} onChange={(e) => setOtp(e.target.value)}
                                    />
                                </Box>
                            </>
                        ) : (null)
                        }
                    </form>

                    {otpBox ? (
                        <Box className='sendotpbtn-wrapper'>
                            <Button type='submit' variant="contained" className='btn' onClick={handleNext}>NEXT</Button>
                        </Box>
                    ) : (
                        <Box className='sendotpbtn-wrapper'>
                            <Button type='submit' variant="contained" className='btn' onClick={handleSendOtp} >SAVE AND SEND OTP</Button>
                        </Box>
                    )}
                </>
            )}

            dont have an account? <span onClick={() => navigate('register-new-user')}>register here</span>

        </div >
    )
}

export default Signin