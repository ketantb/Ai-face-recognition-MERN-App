const AllImagesContainer = ({ eventData }) => {
    // console.log("AllImagesContainer => ", eventData?.eventImages)
    return (
        <ul className='images-list'>
            {eventData?.eventImages?.map((item, idx) => {
                return (
                    <li key={idx}>
                        <img src={item.image} />
                    </li>
                )
            })}
        </ul>
    )
}

export default AllImagesContainer