import { useNavigate } from 'react-router-dom';
import './create-event-pop-up.css'

const CreateEventPopup = ({ handleClose }) => {
    const navigate = useNavigate()
    return (
        <div className="create-event-pop-up-container">
            <div className='create-event-pop-up-header'>
                <h4>Create Event</h4>
                <h4 onClick={handleClose}><RxCross1 /></h4>
            </div>
            <div className='create-event-pop-up-main'>
                <section>
                    <label>Event Name</label>
                    <input type="text" name='eventName' />
                </section>
                <section>
                    <label>Create Date</label>
                    <input type="date" name='createDate' />
                </section>
            </div>
            <div className='create-event-pop-up-save-btn-container'>
                <button onClick={() => navigate('/event-form-page')}>
                    save
                </button>
            </div>
        </div>
    )
}

export default CreateEventPopup