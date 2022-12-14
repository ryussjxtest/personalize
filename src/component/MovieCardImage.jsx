import React from 'react';
import PropTypes from 'prop-types';

import { Image, Segment } from 'semantic-ui-react'

function MovieCardImage({movieName, minHeight, fontSize, imageUrl}) {
  
  console.log('❤❤❤❤',movieName,minHeight, imageUrl);
    return (
      <Segment style={{minHeight, display: 'flex'}}>
        <Image rounded size='medium' centered src={ imageUrl }  />
      </Segment>
    );
  }
  
  MovieCardImage.propTypes = {
    dealName: PropTypes.string,
    minHeight: PropTypes.number,
    fontSize: PropTypes.number,
    imageUrl: PropTypes.string
  };

  export default MovieCardImage;