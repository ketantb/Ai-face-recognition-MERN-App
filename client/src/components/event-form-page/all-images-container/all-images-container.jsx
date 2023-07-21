const AllImagesContainer = ({ eventData }) => {
    return (
        <ul className='images-list'>
            {eventData?.eventImages?.map((image, idx) => {
                return (
                    <li key={idx}>
                        <img src={image} />
                    </li>
                )
            })}
        </ul>
    )
}

export default AllImagesContainer