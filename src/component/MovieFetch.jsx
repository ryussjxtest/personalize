import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.json';


import { Icon, Header, Button, Container  } from 'semantic-ui-react'
import { NavLink, Link, HashRouter, useParams } from 'react-router-dom';

import MoviesCarouselPage from './MoviesCarouselPage'

import { AuthContext } from '../context/Auth.context';

export const MOVIE_FETCH_TYPES = {
  all: "all",
  popularity : 'popularity',
  personalize : 'personalize',
}
function MovieFetch() {
    const [movies, setMovies] = useState([]);
    const ContextState = useContext(AuthContext);
    const userId = ContextState.state.userId;
    const fetch_type = useParams();
    let get_movie_url = config.ApiUrl 
    // Fetch all movie data from Movie Table in DynamoDB (GET)
    // config.ApiUrl need to be updated during Frontend set up lab.
    
    useEffect(() => {
      
      switch(fetch_type){        
        case MOVIE_FETCH_TYPES.popularity :
          get_movie_url += '/recommendation.popularity';
          break;
        case MOVIE_FETCH_TYPES.personalize :
          get_movie_url += `/recommendation/personalized/${userId}`;
          break;
        case MOVIE_FETCH_TYPES.all:
        default:
          get_movie_url += "/movie";
          break;
      }
        
      console.log("[MovieFetch] useEffect get_url:",get_movie_url);
      
      async function fetchMovieData () {
        const response = await axios.get(
          get_movie_url,);

         console.log((response.data));
         setMovies((response.data))
      }

      fetchMovieData();
    }, [fetch_type]);
    
  
    document.title = 'Pebble World';
    return (
      <div >
        <Header as='h3'>
          <Icon name='star' />
          <Header.Content>Popular movies
          <Header.Subheader>10 MOST POPULAR MOVIES RIGHT NOW</Header.Subheader>
          </Header.Content>
        </Header>
        
        <MoviesCarouselPage items={movies} pageViewOrigin='Browse'/>        
      </div>
    );
  };

  export default MovieFetch;