import './home-page.css'
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { BsCalendar4Event } from 'react-icons/bs';
import { Modal, Box } from "@mui/material";
import CreateEventPopup from './create-event/create-event-pop-up';
import { useState } from 'react';

const HomePage = () => {
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="home-page-container">
            <section className="home-page-header">
                <div className='home-page-header-lb'>
                    <button>
                        {/* <MdOutlineArrowBackIosNew /> */}
                    </button>
                    <button onClick={handleOpen}>
                        Create Event
                    </button>
                </div>
                <div className='home-page-header-rb'>
                    <button>
                        <span><FiSettings /></span>
                        <span>Dashboard Settings</span>
                    </button>
                </div>
            </section>
            <main>
                <div className='home-page-main-button-container'>
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
                <div className='home-page-main-data-container'>

                </div>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="create-event-popup-modal"
            >
                <Box sx={style}>
                    <CreateEventPopup handleClose={handleClose}/>
                </Box>
            </Modal>
        </div>
    )
}

export default HomePage;
