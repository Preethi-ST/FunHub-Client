import React from 'react'
import { img_300, unavailable } from '../../Config/config'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './OneShow.css'
import { useHistory } from 'react-router-dom';
function OneShow({id,
    poster,
    title,
    date,
    media_type,
    vote_average,}) {
        const history = useHistory();
    return (
        <div className='media' onClick={()=>history.push(`/${media_type}/${id}`)}>
            <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable } alt = {title} />
            <div style={{ width: 50, height: 50 }} className='rating'>
                <CircularProgressbar 
                    value={vote_average * 10}
                    text={`${vote_average * 10}%`}
                    background
                    /* backgroundPadding={6} */
                    styles={buildStyles({
                        backgroundColor: "rgba(0,0,0,0.6)",
                        textColor: "rgb(69, 211, 224)",/* rgb(101, 219, 228) */
                        pathColor: "rgb(58, 206, 58)",
                        textSize: "27px"
                    })}
                />
            </div>
            <b className='title'>{title}</b>
            <div className='subTitle'>
                <span>{media_type === 'tv' ? 'TV Series' : 'Movie'}</span>
                <span>{(new Date(date).toDateString())}</span>
            </div>
        </div>
    )
}

export default OneShow
