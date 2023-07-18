import { useNavigate } from 'react-router-dom';
import './create-event-pop-up.css'
import { RxCross1 } from 'react-icons/rx';
import { useState } from 'react';
import axios from '../../../helpers/axios'
import { useDispatch } from 'react-redux';
import { getCreateEventData } from '../../../store/reducer';

const CreateEventPopup = ({ handleClose }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [createEventForm, setCreateEventForm] = useState({ eventName: "", eventDate: "" })
    const handleCreateEventForm = (e) => {
        setCreateEventForm({ ...createEventForm, [e.target.name]: e.target.value })
    }
    const postCreateEventForm = async (e) => {
        e.preventDefault();
        console.log(createEventForm);
        await axios.post('/create-event', createEventForm)
            .then((res) => {
                if (res.data.success) {
                    const eventName = res.data.message.eventName;
                    const eventId = res.data.message._id;
                    dispatch(getCreateEventData(createEventForm))
                    navigate(`/event-form-page/${eventName}/${eventId}`);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="create-event-pop-up-container">
            <div className='create-event-pop-up-header'>
                <h4>Create Event</h4>
                <h4 onClick={handleClose}><RxCross1 /></h4>
            </div>
            <div className='create-event-pop-up-main'>
                <section>
                    <label>Event Name</label>
                    <input type="text" name='eventName' onChange={handleCreateEventForm} />
                </section>
                <section>
                    <label>Create Date</label>
                    <input type="date" name='eventDate' onChange={handleCreateEventForm} />
                </section>
            </div>
            <div className='create-event-pop-up-save-btn-container'>
                {/* <button onClick={() => navigate('/event-form-page')}> */}
                <button onClick={postCreateEventForm}>
                    save
                </button>
            </div>
        </div>
    )
}

export default CreateEventPopup