import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';

function MoviePoster(id) {
    const ApiKey ='8dd16d84347892215c6a88955c127bc6'
    // const Lang = 'en-US'
    const Lang = 'ko-KR'
    let MovieId = id
    const ImgSize ='w500'
    const [Movie,setMovie] = useState([])

    useEffect(()=>{
        const Req_Url = `https://api.themoviedb.org/3/movie/${MovieId.id}?api_key=${ApiKey}&language=${Lang}`;
        console.log("[MoviePoster]  (useEffect) ");

        fetch(Req_Url)
        .then(res => res.json())
        .then(res => {
        setMovie(res)
        } )
    },[])

    return (
        <img src = {'https://image.tmdb.org/t/p/'+ImgSize+'/'+Movie.poster_path}
            alt= 'No Image'
        />
    );
}

MoviePoster.propTypes = {
    id: PropTypes.string,
  };
    
export default MoviePoster;
    