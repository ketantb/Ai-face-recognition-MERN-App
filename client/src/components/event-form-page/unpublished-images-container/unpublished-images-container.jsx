const UnpublishedImagesContainer = ({ eventData }) => {
    // console.log("UnpublishedImagesContainer => ", eventData?.eventImages)
    return (
        <ul className='images-list'>
            {eventData?.eventImages?.map((item, idx) => {
                return (
                    <li key={idx}>
                        {!item.published == true?
                            <img src={item.image} />
                            : null}
                    </li>
                )
            })}
        </ul>
    )
}

export default UnpublishedImagesContainer