import './add-video-link-modal.css'
import { RxCross1 } from 'react-icons/rx';

const AddVideoLinkModal = ({ handleClose }) => {
   return (
      <div className='add-video-link-modal-container'>
         {/* <h4><RxCross1 /></h4> */}
         <section>
            <label htmlFor='add-video-link-input-tag'>Enter Video Link</label>
         </section>
         <section>
            <input id='add-video-link-input-tag' type='text' />
         </section>
         <section>
            <button>Add</button>
         </section>
      </div>
   )
}

export default AddVideoLinkModal;