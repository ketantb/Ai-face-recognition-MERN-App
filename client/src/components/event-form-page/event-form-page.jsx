import './event-form-page.css'
import { FiSettings } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { ImBin } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { data } from './configs'
import dummyImg from '../../assets/fr-gallery-dummyimg.jpg'
import { Modal, Box } from "@mui/material";
import AddVideoLinkModal from './add-video-link-modal/add-video-link-modal';
import { useSelector } from 'react-redux';
import axios from '../../helpers/axios'
import { useParams } from 'react-router-dom';

const EventFormPage = () => {
    //use params
    const { eventName, eventId } = useParams();
    console.log(eventName, eventId)
    const { createEventData } = useSelector((store) => store.eventPopUP)
    // console.log(createEventData)

    const [eventData, setEventData] = useState()

    const getEventDetails = async () => {
        await axios.get(`/event-details/${eventName}/${eventId}`)
            .then((res) => {
                console.log('getEventdetails => ', res.data.message)
                setEventData(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editEventDetails = async () => {
        await axios.put(`/edit-event-details/${eventName}/${eventId}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        bgcolor: "#ffff",
        borderRadius: "3px",
        boxShadow: 'inset 1px 1px 5px -1px rgba(0,0,0,0.5)',
        p: 4,
    };

    const [videoLinkArr, setVideoLinkArr] = useState([])
    console.log(videoLinkArr)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [coverPic, setCoverPic] = useState()
    const [inputTagDisplay, setInputTagDisplay] = useState("block")

    useEffect(() => {
        getEventDetails();
    }, [])

    return (
        <div className="event-form-page-wrapper">
            <section className="event-form-page-header">
                <div className='event-form-page-header-lb'>
                    <input style={{ visibility: 'hidden' }} id='event-form-page-header-lb-add-image' type='file' />
                    <label className='rounded-btns' htmlFor='event-form-page-header-lb-add-image'>
                        Add Images
                    </label>
                    <button onClick={handleOpen}>
                        Add Video Link
                    </button>
                </div>
                <div className='event-form-page-header-rb'>
                    {/* eventName through redux ==>
                    <h4>{createEventData.eventName}</h4> */}
                    <h4>{eventName}</h4>
                    <h4><CiEdit /></h4>
                </div>
            </section>
            <main className='event-form-main-container'>
                <section className='lb'>
                    <div className='event-form-page-main-button-container'>
                        <section>
                            <button>SHOW ALL</button>
                        </section>
                        <section>
                            <button>UNPUBLISHED IMAGES</button>
                        </section>
                        <section>
                            <button>VIDEOS</button>
                        </section>
                    </div>
                    <div className='event-form-page-main-data-container'>
                        {/* {!data ?
                            <div className='dummy-text'>
                                <p><AiOutlineCloudUpload className='cloud-upload-icon' /></p>
                                <p>Drag & drop your Images & folders to upload</p>
                                <p>Maximum upload per file size: 20MB</p>
                            </div>
                            :  */}
                        <ul className='images-list'>
                            {data.map((el, idx) => {
                                return (
                                    <li><img src={dummyImg} /></li>
                                )
                            })}
                        </ul>
                        {/* } */}
                    </div>
                </section>
                <section className='rb'>
                    <div>
                        <div>
                            <section style={{ display: coverPic ? "none" : "block" }}>
                                <div>
                                    <input id='cover-pic-input' type='file' onChange={(e) => { setCoverPic(e.target.files[0]) }} />
                                    <label htmlFor='cover-pic-input'> Add cover page 1080 × 1080</label>
                                </div>
                            </section>
                            {coverPic ?
                                <div className='cover-pic-preview-image-container'>
                                    <img className='cover-pic-preview-image' src={URL.createObjectURL(coverPic)} />
                                    <p className='cover-pic-preview-image-dustbinIcon' onClick={() => setCoverPic("")}><ImBin /></p>
                                </div>
                                : null}
                        </div>
                    </div>
                    <div>
                        <textarea className='event-form-edit-textarea'
                            placeholder='Edit Maximum 150 Characters' />
                    </div>
                    <div>
                        <p>Event Code: <span>42485</span></p>
                        <p>copy</p>
                    </div>
                    <div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <button className='rounded-btns'>
                                Share with client
                            </button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                            <button className='rounded-btns'>
                                Preview
                            </button>
                            <button className='rounded-btns'>
                                Publish
                            </button>
                        </div>
                        <div className='delete-event-btn-wrapper'>
                            <button className='rounded-btns'>
                                Delete Event...?<ImBin />
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="create-event-popup-modal"
            >
                <Box sx={style}>
                    <AddVideoLinkModal handleClose={handleClose} videoLinkArr={videoLinkArr} setVideoLinkArr={setVideoLinkArr} />
                </Box>
            </Modal>
        </div >
    )
}

export default EventFormPage;