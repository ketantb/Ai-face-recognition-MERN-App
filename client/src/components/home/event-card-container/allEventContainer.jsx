import './allEventContainer.css'
import EventCard from "../event-card/eventCard";

const AllEventContainer = ({ allEvents }) => {
    return (
        <div className='home-event-card-container'>
            {allEvents?.map((event) => {
                return <EventCard event={event} key={event._id}/>
            })}
        </div>
    )
}

export default AllEventContainer;