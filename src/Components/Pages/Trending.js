import axios from 'axios'
import React,{useState,useEffect} from 'react'
import CustomPagination from '../Pagination/CustomPagination'
import OneShow from './OneShow/OneShow'
import './Trending.css'
function Trending() {
    const [content,setContent] = useState([])
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        const fetchTrending = async () => {
            console.log(process.env.REACT_APP_API_KEY)
            const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
            console.log(data)
            setContent(data.results)
        }
        fetchTrending()
    }, [page])
    return (
        <div>
            <span className='pageTitle'>Trending</span>
            <div className='trending'>
                {
                    content && (
                        content.map((c) => (
                            <OneShow key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}/>
                        ))
                    )
                }
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    )
}

export default Trending
