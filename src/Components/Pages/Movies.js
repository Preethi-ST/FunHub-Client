import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Geners from '../Geners'
import CustomPagination from '../Pagination/CustomPagination'
import OneShow from './OneShow/OneShow'

function Movies() {
    const [page, setPage] = useState(1)
    const [shows, setShows] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres,setSelectedGenres] = useState([])
    const [genres,setGenres] = useState([])

    const getGenres = function(property) {
        return function(object) {
          return object[property]
        }
    } 
    useEffect(() => {
        const fetchMovies = async () => {

            const getGen = getGenres("id")
            const setGenreList = selectedGenres.map(getGen)

            const {data} = await axios.get(`
            https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${setGenreList.join()}`)/* &with_genres=${genereforURL} */
            
            setShows(data.results)
            setNumOfPages(data.total_pages)
            
        }
        fetchMovies()
    }, [page,selectedGenres])
    return (
        <div>
            <span className='pageTitle'>Movies</span>
            <Geners
                type = 'movie'
                selectedGenres = {selectedGenres}
                setSelectedGenres = {setSelectedGenres}
                genres = {genres}
                setGeners = {setGenres}
                setPage = {setPage}
            />
            <div className='trending'>
                {console.log(shows)}
                {
                    shows && (
                        shows.map((c) => (
                            <OneShow key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type='movie'
                            vote_average={c.vote_average}/>
                        ))
                    )
                }
            </div>
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        </div>
    )
}

export default Movies
