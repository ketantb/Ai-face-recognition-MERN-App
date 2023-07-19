import { useState } from 'react';
import './add-video-link-modal.css'
import { RxCross1 } from 'react-icons/rx';

const AddVideoLinkModal = ({ handleCloseVideoLinkModal, videoLinkArr, setVideoLinkArr }) => {
   const [videoLink, setVideoLink] = useState()
   const addVideoLink = () => {
      setVideoLinkArr([...videoLinkArr, videoLink])
   }
   return (
      <div className='add-video-link-modal-container'>
         {/* <h4><RxCross1 /></h4> */}
         <section>
            <label htmlFor='add-video-link-input-tag'>Enter Video Link</label>
         </section>
         <section>
            <input id='add-video-link-input-tag' type='text' name='videoLink' onChange={(e) => setVideoLink(e.target.value)}/>
         </section>
         <section>
            <button onClick={addVideoLink}>Add</button>
         </section>
      </div>
   )
}

export default AddVideoLinkModal;