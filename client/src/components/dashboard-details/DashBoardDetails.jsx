import React, { useEffect, useState } from 'react'
import './DashBoardDetails.css'
import { Box, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DashBoardDetails = () => {
    const navigate = useNavigate()

    const [dashboardData, setDashboardData] = useState({
        companyName: '', contactNo: '', companyEmail: '', socialLink: '',
        companyLogo: '', address: ''
    })
    const [logo, setLogo] = useState('')
    // const [watermark, setWatermark] = useState({

    // })

    //HANDLE INPUTS OF dashboardData
    const handleInputs = (e) => {
        setDashboardData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    //UPLOAD LOGO
    const handleUploadLogo = async () => {
        // navigate('/watermaker-setup')
        return navigate('/home-page')
        const logoImg = new FormData()
        logoImg.append('file', logo)
        logoImg.append('upload_preset', 'insta_clone')

        await axios.post('https://api.cloudinary.com/v1_1/harshada0611/image/upload', logoImg)
            .then(response => {
                console.log(response)
                setDashboardData({ ...dashboardData, companyLogo: response.data.secure_url })
            })
            .catch(err => {
                console.log(err)
            })
    }

    //HANDLE SAVE
    const handleSave = async () => {
        const DashBoardDetails = {
            companyName: dashboardData.companyName,
            companyLogo: dashboardData.companyLogo,
            contactNo: dashboardData.contactNo,
            companyEmail: dashboardData.companyEmail,
            socialLink: dashboardData.socialLink,
            address: dashboardData.address
        }
        // console.log('final result', DashBoardDetails)
        const response = await axios.post('http://localhost:8000/dashboard-details', DashBoardDetails)
        if (response.data.success) {
            console.log(response.data.newEntry._id)
            setDashboardData()
            navigate(`/gallary/${response.data.newEntry._id}`)
        }
        else {
            console.log(response)
        }
    }

    useEffect(() => {
        if (dashboardData.companyLogo) {
            handleSave();
        }
        // eslint-disable-next-line
    }, [dashboardData.companyLogo])


    return (
        <div className='dashboard-details-wrappper'>
            <h2>Dashboard Settings</h2>
            <h6>Update your account details, profile and more</h6>


            <form className='container'>
                <TextField type="text" className="form-control" label="Company Name"
                    name='companyName' value={dashboardData.companyName} onChange={handleInputs} />

                <Box className='company-logo'>
                    <label>Company Logo</label>
                    <input className='file-btn'
                        id="upload-file"
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                    />
                </Box>
                
                <TextField type="number" className="form-control" label="Contact Number"
                    name='contactNo' value={dashboardData.contactNo} onChange={handleInputs} />

                <TextField type="number" className="form-control" label="Office/ Home Address"
                    name='address' value={dashboardData.address} onChange={handleInputs} />

                <Box className='watermark-wrapper'>
                    <div>Watermark</div>
                    {/* <div>2</div> */}
                </Box>

                <TextField type="email" className="form-control" label="Company Email"
                    name='companyEmail' value={dashboardData.companyEmail} onChange={handleInputs} />
                <TextField type="text" className="form-control" label="Social Link"
                    name='socialLink' alue={dashboardData.socialLink} onChange={handleInputs} />

                <Box className='savebtn-wrapper'>
                    <Button variant="contained" className='btn' onClick={handleUploadLogo} >SAVE</Button>
                </Box>

            </form>
        </div>
    )
}

export default DashBoardDetails