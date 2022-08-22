import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.json';


import { Icon, Header, Button, Container  } from 'semantic-ui-react'
import { NavLink, Link, HashRouter } from 'react-router-dom';

import MoviesCarouselPage from './MoviesCarouselPage'

import { AuthContext } from '../context/Auth.context';

function MoviePersonalize() {
    const [permovies, setperMovies] = useState([]);
    const ContextState = useContext(AuthContext);
    const userId = ContextState.state.userId;

    // Fetch all movie data from Movie Table in DynamoDB (GET)
    // config.ApiUrl need to be updated during Frontend set up lab.
    
    useEffect(() => {
      const get_per_movie_url = `${config.ApiUrl}/recommendation/personalized/${userId}`
      console.log("[MoviePersonalize] useEffect per_url:",get_per_movie_url);

      async function fetchPersonalizeData () {
        const response = await axios.get(
          get_per_movie_url,);
          // console.log("[MoviePersonalize ]useEffect ",(response.data)['movies']);
        //  setMovies((response.data)['movies'])
        //  console.log(config.ApiUrl)
         console.log("[MoviePersonalize] (fetchPersonalizeData) response",(response));
        //  console.log("[MoviePersonalize] (fetchPersonalizeData) response.data",(response.data));
         setperMovies((response.data))
      }
      fetchPersonalizeData();
    }, [userId]);
    
  
    document.title = 'Pebble World';
    return (
      <div >
        <Header as='h3'>
          <Icon name='heart' />
          <Header.Content>Recommended movies
          <Header.Subheader>personalized movie recommendation</Header.Subheader>
          </Header.Content>
        </Header>

        <MoviesCarouselPage items={permovies} pageViewOrigin='Browse'/>
      </div>
    );
  };

  export default MoviePersonalize;