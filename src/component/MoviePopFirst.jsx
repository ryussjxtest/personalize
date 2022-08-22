import { Icon, Header, Button, Container  } from 'semantic-ui-react'
import { NavLink, Link, HashRouter } from 'react-router-dom';

import MoviePersonalize from "./MoviePersonalize";
import MoviePopularity from "./MoviePopularity";

function MoviePopFirst() {   
  
    document.title = 'Pebble World';
    return (
      <div >
        <div className="ui divider"></div>
        <MoviePopularity />
        <div className="ui divider"></div>
        <MoviePersonalize />
        <div className="ui divider"></div>
        <Container textAlign='center'>
        <Button Icon labelPosition='right' size='big' as={Link} to='/allmovie'> 
          All Movie List 
          <Icon name='right arrow' />
        </Button>
        </Container>
      </div>
    );
  };

  export default MoviePopFirst;