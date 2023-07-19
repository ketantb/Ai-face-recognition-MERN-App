import './add-image-modal.css'
import { toast } from "react-hot-toast";
import axios from '../../../helpers/axios'
import { useEffect, useState } from 'react';

const AddImageModal = ({
    handleCloseAddImagesModal,
    imgArr,
    setImgArr,
    imgLinkArr,
    setImgLinkArr,
    eventData }) => {

    const [uploadToDB, setUploadToDB] = useState(false)

    const handleImages = (e) => {
        setImgArr([...imgArr, e.target.files[0]])
    }

    const uploadImages = async () => {
        if (!imgArr.length) {
            return toast.error('no image selected')
        }
        let arr = [];
        toast.loading("Uploading images! please wait");
        for (let i = 0; i < imgArr.length; i++) {
            const imgData = new FormData()
            imgData.append("file", imgArr[i])
            imgData.append("upload_preset", "ketanInstaClone")
            await axios.post("https://api.cloudinary.com/v1_1/ketantb/image/upload", imgData)
                .then((res) => {
                    arr.push(res.data.url)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        toast.dismiss()
        console.log(arr)
        setImgLinkArr(arr)
        !uploadToDB ? setUploadToDB(true) : setUploadToDB(false)
    }

    const patchImagestoDB = () => {
        let array = [...eventData.eventImages, ...imgLinkArr]
        console.log("array => ", array)
        axios.patch(`/update-event-images/${eventData._id}`, array)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setImgArr([])
                    setUploadToDB(false)
                    handleCloseAddImagesModal()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (uploadToDB) {
            patchImagestoDB();
        }
    }, [uploadToDB])
    return (
        <div className='add-image-container'>
            <section>
                <input type='file' onChange={handleImages} />
            </section>
            <section>
                {imgArr.length ?
                    <ul className='add-image-ul'>
                        {imgArr.map((image) => {
                            return (
                                <li key={URL.createObjectURL(image)}>
                                    <img src={URL.createObjectURL(image)} />
                                </li>
                            )
                        })}
                    </ul>
                    : null}
            </section>
            <section>
                <button onClick={uploadImages}>
                    upload images
                </button>
            </section>
        </div>
    )
}

export default AddImageModal