import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.json';


import { Icon, Header, Button, Container  } from 'semantic-ui-react'
import { NavLink, Link, HashRouter } from 'react-router-dom';

import MoviesCarouselPage from './MoviesCarouselPage'

import { AuthContext } from '../context/Auth.context';

function MoviePopularity() {
    const [popmovies, setpopMovies] = useState([]);
    const ContextState = useContext(AuthContext);
    const userId = ContextState.state.userId;

    // Fetch all movie data from Movie Table in DynamoDB (GET)
    // config.ApiUrl need to be updated during Frontend set up lab.
    
    useEffect(() => {
      const get_pop_movie_url = `${config.ApiUrl}/recommendation/popularity`  
      console.log("[MoviesCarousel] useEffect pop_url:",get_pop_movie_url);
      
      async function fetchPopularityData () {
        const response = await axios.get(
          get_pop_movie_url,);
        //  console.log((response.data)['movies']);
        //  setMovies((response.data)['movies'])
        //  console.log(config.ApiUrl)
         console.log((response.data));
         setpopMovies((response.data))
      }

      fetchPopularityData();
    }, []);
    
  
    document.title = 'Pebble World';
    return (
      <div >
        <Header as='h3'>
          <Icon name='star' />
          <Header.Content>Popular movies
          <Header.Subheader>10 MOST POPULAR MOVIES RIGHT NOW</Header.Subheader>
          </Header.Content>
        </Header>
        
        <MoviesCarouselPage items={popmovies} pageViewOrigin='Browse'/>        
      </div>
    );
  };

  export default MoviePopularity;