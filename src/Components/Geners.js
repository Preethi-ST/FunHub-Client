import { Chip } from '@material-ui/core'
import axios from 'axios'
import React,{useEffect} from 'react'

function Geners({selectedGenres,setSelectedGenres,genres,setGeners,type,setPage}) {
    console.log(selectedGenres)
    
    const handleAdd = (genre) => {
        console.log(selectedGenres)

        setSelectedGenres([...selectedGenres,genre])
        setGeners(genres.filter((g) => g.id !== genre.id))
        setPage(1)
    }
    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id))
        setGeners([...genres,genre])
        setPage(1)
    }
    useEffect(() => {
        const fetchGeners = async () => {
           const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

           setGeners(data.genres)

           console.log(data.genres)
           /* console.log(genreList) */
        }
        fetchGeners()

        return () => {
            setGeners([])
        } 
        // eslint-disable-next-line
    }, [type])
    return (
        <div style={{padding:'6px 0'}}>
            {
                selectedGenres && ( 
                    selectedGenres.map((genre) => (
                        <Chip 
                            label = {genre.name}
                            style = {{margin : 2}}
                            size = 'small'
                            color = 'primary'
                            key = {genre.id}
                            clickable
                            onDelete = {()=> handleRemove(genre)}
                        />
                    ))
                ) 
            }
            {
                genres && ( 
                    genres.map((genre) => (
                        <Chip 
                            label = {genre.name}
                            style = {{margin : 2}}
                            size = 'small'
                            key = {genre.id}
                            clickable
                            onClick = {()=>handleAdd(genre)}
                        />
                    ))
                ) 
            }
        </div>
    )
}

export default Geners
