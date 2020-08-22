import React, {memo} from "react";

const AnimeCard = ({title, image}) => {
    return (
        <div className='card'>
            <img src={image} alt=""/>
            <h4>{title}</h4>
        </div>
    );
}

export default memo(AnimeCard);
