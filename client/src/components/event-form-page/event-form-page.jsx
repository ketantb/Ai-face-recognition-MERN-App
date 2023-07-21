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
import AddImageModal from './add-image-modal/add-image-modal';
import AllImagesContainer from './all-images-container/all-images-container';
import AllVideosContainer from './all-videos-container/all-videos-container';

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
    const [openVideoLinkModal, setOpenVideoLinkModal] = useState(false);
    const handleOpenVideoLinkModal = () => setOpenVideoLinkModal(true);
    const handleCloseVideoLinkModal = () => setOpenVideoLinkModal(false);

    const [imgArr, setImgArr] = useState([])
    const [imgLinkArr, setImgLinkArr] = useState([])
    // console.log(imgArr)
    console.log(imgLinkArr)
    const [openAddImagesModal, setOpenAddImagesModal] = useState(false);
    const handleOpenAddImagesModal = () => setOpenAddImagesModal(true);
    const handleCloseAddImagesModal = () => setOpenAddImagesModal(false);

    const [coverPic, setCoverPic] = useState()
    const [inputTagDisplay, setInputTagDisplay] = useState("block")

    const editCoverPage = (e) => {
        setCoverPic(e.target.files[0])
        setEventData({ ...eventData, eventCoverPage: URL.createObjectURL(e.target.files[0]) })
        console.log(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        getEventDetails();
    }, [])

    return (
        <div className="event-form-page-wrapper">
            <section className="event-form-page-header">
                <div className='event-form-page-header-lb'>
                    <button onClick={handleOpenAddImagesModal}>
                        Add Images
                    </button>
                    <button onClick={handleOpenVideoLinkModal}>
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
                        {/* <ul className='images-list'>
                            {eventData?.eventImages?.map((image, idx) => {
                                return (
                                    <li key={idx}>
                                        <img src={image} />
                                    </li>
                                )
                            })}
                        </ul> */}
                        <AllVideosContainer eventData={eventData} getEventDetails={getEventDetails} />
                        {/* <AllImagesContainer eventData={eventData} /> */}
                        {/* } */}
                    </div>
                </section>
                <section className='rb'>
                    <div>
                        <div className='cover-pic-preview-image-container'>
                            {/* <img className='cover-pic-preview-image' src={URL.createObjectURL(coverPic)} /> */}
                            <img className='cover-pic-preview-image' src={eventData?.eventCoverPage} />
                            <p className='cover-pic-preview-image-dustbinIcon' onClick={() => setCoverPic("")}>
                                <input id='cover-pic-input' type='file' onChange={editCoverPage} />
                                <label htmlFor='cover-pic-input'>change cover page 1080 × 1080</label>
                            </p>
                        </div>
                        <button className='rounded-btns'>
                            change cover page
                        </button>
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

            {/* Add Image Modal */}
            <Modal
                open={openAddImagesModal}
                onClose={handleCloseAddImagesModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="add-images-popup-modal"
            >
                <Box sx={style}>
                    <AddImageModal
                        handleCloseAddImagesModal={handleCloseAddImagesModal}
                        imgArr={imgArr} setImgArr={setImgArr}
                        imgLinkArr={imgLinkArr}
                        setImgLinkArr={setImgLinkArr}
                        eventData={eventData}
                    />
                </Box>
            </Modal>
            {/* Add Image Modal */}

            {/* Add Video Link Modal */}
            <Modal
                open={openVideoLinkModal}
                onClose={handleCloseVideoLinkModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="create-event-popup-modal"
            >
                <Box sx={style}>
                    <AddVideoLinkModal
                        handleCloseVideoLinkModal={handleCloseVideoLinkModal}
                        videoLinkArr={videoLinkArr}
                        setVideoLinkArr={setVideoLinkArr}
                        getEventDetails={getEventDetails}
                        eventData={eventData}
                    />
                </Box>
            </Modal>
            {/* Add Video Link Modal */}
        </div >
    )
}

export default EventFormPage;