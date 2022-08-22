import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config.json';

import { BrowserRouter as Router, Route, NavLink, Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../context/Auth.context.jsx';


import { Container, Divider, Card, Placeholder, Button, Icon, Rating, Grid } from 'semantic-ui-react'

import MovieCardImage from './MovieCardImage'
import RecommendedMovieList from './RecommendationMovieList';

import { useTracking } from 'react-tracking';
import { dispatchUserEvent } from '../util/Utils';
import MoviePlayer from './MoviePlayer';


// 영화 상세 페이지
function MovieDetails({ id, locationState }) {
  const { state: ContextState, login } = useContext(AuthContext);
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    username,
    userId
  } = ContextState;
    const [movie, setMovie] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [recommendedMovies, setRecommendedMovies] = React.useState([]);
    const [recommendedMovies2, setRecommendedMovies2] = React.useState([]);
    // const { state } = useContext(AuthContext);
    const [youtubeVideo, setYoutubeVideo] = React.useState({});
    const [youtubeLoading, setYoutubeLoading] = React.useState(true);
    // config.ApiUrl need to be updated during Frontend set up lab.
    const config_api_url = config.ApiUrl;
  
    // Fetch a movie data for specific movie id from Movie Table in DynamoDB (GET)
    const get_a_movie_url = `${config_api_url}/movie`
    const a_movie_api = `${get_a_movie_url}/${id}`

    const ApiKey ='8dd16d84347892215c6a88955c127bc6'
    // const Lang = 'en-US'
    const Lang = 'ko-KR'
    const Tmdb_api = `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=${Lang}`;
    const Tmdb_api_getVideo = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}`;
    // const Tmdb_api_getVideo = `https://api.themoviedb.org/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc`;

    React.useEffect(() => {
      
      async function loadDealInfo() {
        console.log('[MovieDetails] (loadDealInfo).........');
        const response = await axios.get(
          Tmdb_api,
        );
        console.log('[MovieDetails] (loadDealInfo) response : ',(response));
        console.log('[MovieDetails] (loadDealInfo) response : ',(response.data.genres.length));
        setMovie((response.data))
        setLoading(false);

        document.title = `${response.data.title} - Pebble World`;
      };
      

      async function loadYoutubeInfo() {
        console.log('[MovieDetails] (loadYoutubeInfo).........');
        const response = await axios.get(
          Tmdb_api_getVideo,
        );
        console.log('[MovieDetails] (loadYoutubeInfo) response : ',(response));
        console.log('[MovieDetails] (loadYoutubeInfo) response.id : ',response.data.id);
        console.log('[MovieDetails] (loadYoutubeInfo) response.result : ',response.data.results);
        setYoutubeVideo((response.data))
        setYoutubeLoading(false);

        // document.title = `${response.data.title} - Pebble World`;
      };
      loadDealInfo();
      loadYoutubeInfo();
  
      return () => {
        setMovie({});
        setLoading(true);
        setYoutubeVideo({});
        setYoutubeLoading(true);
      };
    }, [id, locationState]);

    const UserId = ContextState.userId;

    const { Track, trackEvent } = useTracking({page: 'MoviesCarouselPage'}, {
      dispatch: (data) => dispatchUserEvent(data)
    });

    const marginTop = 50
    const width = '80%'
    const maxWidth = 720;
    const minHeight = 100
    const headerTitleFontSize = 40
    
    const onClickFakeButton = () => {
      console.log(`[MovieDetails] (Fake fake watch just event.) EVENT_TYPE: 'click', movieId: ${movie.id}, UserId:${UserId}`);
      trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}`, UserId:`${UserId}` }); 
    }
    // id: "6229af3663aad2006d22026c"
    // key: "qoEyZoOTtss"
    // name: "The Final Cut Trailer"
    // site: "YouTube"
    // size: 2160
    // type: "Trailer"
    const onClickWatchButton = () => {
      console.log(`[MovieDetails] (onClickWatchButton) EVENT_TYPE: 'click', movieId: ${movie.id}, UserId:${UserId}`);
      trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}`, UserId:`${UserId}` }); 
      console.log(`[MovieDetails]  youtubeVideo cnt: ${youtubeVideo.results.length}`);
      console.log(`[MovieDetails]  youtubeVideo id: ${youtubeVideo.results[0].id}`);
      console.log(`[MovieDetails]  youtubeVideo key: ${youtubeVideo.results[0].key}`);
      console.log(`[MovieDetails]  youtubeVideo name: ${youtubeVideo.results[0].name}`);
      console.log(`[MovieDetails]  youtubeVideo size: ${youtubeVideo.results[0].size}`);
      console.log(`[MovieDetails]  youtubeVideo type: ${youtubeVideo.results[0].type}`);
      return (<MoviePlayer />);
    }

    return (
      <Container  style={{ marginTop: marginTop }}>
        {/* <NavLink to='/'><Icon name='arrow left'/>Back to Movie list</NavLink> */}
        <Divider hidden/>
        <Grid>
          {/* <Grid.Row columns={1}>
            <Grid.Column centered>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Line/>
                    <Placeholder.Line/>          
                  </Placeholder>
                ) : (
                  // <Card.Content>
                    <p style={{width: width,
                      fontSize:headerTitleFontSize,
                      textAlign:'center'}}>{movie.title}</p>
                  // </Card.Content>
                )}
            </Grid.Column>
            
          </Grid.Row> */}

          <Grid.Row columns={2}>
            <Grid.Column >
              <Card color='red' key={movie.id} style={{alignItem:'flex-end' ,width: width, maxWidth: maxWidth, minHeight: minHeight, margin: 'auto' }}>
                {(loading || youtubeLoading) ? (
                  <Placeholder fluid style={{minHeight: maxWidth}}>
                    <Placeholder.Image/>
                  </Placeholder>
                ) : 
                (
                  <MovieCardImage movieName={movie.title} size = "medium" minHeight={minHeight} imageUrl={'https://image.tmdb.org/t/p/w500/'+movie.poster_path}/>
                )}
              </Card>
            </Grid.Column>
            <Grid.Column >
              {/* <Card color='yellow' key={movie.id} style={{ width: width, maxWidth: maxWidth, minHeight: minHeight, margin: 'auto' }}> */}
                {(loading || youtubeLoading)? (
                  <Placeholder>
                    <Placeholder.Line/>
                    <Placeholder.Line/>          
                  </Placeholder>
                ) : (
                  <Card.Content style={{ width: width, maxWidth: maxWidth, minHeight: minHeight, margin: 'auto' }}> 
                    <Card.Header style={{fontSize:headerTitleFontSize-10}}>{movie.title}</Card.Header>
                    
                    {movie.genres.length !== 0 && 
                      (<Card.Meta><Icon name='tag'/> 
                        {movie.genres.map((genre)=>{
                          return <span key={genre.name}>{`#${genre.name} `}</span>
                        })}
                      </Card.Meta>)}
                    
                    <Card.Description><Rating icon='heart' disabled defaultRating={movie.vote_average} maxRating={10} />{` (${movie.vote_average}/10.0)`}</Card.Description>
                    <Card.Header as="h1"> </Card.Header>
                    {movie.release_date.length !== 0 && 
                      (<Card.Meta><Icon name='time'/>{movie.release_date}</Card.Meta>)}
                    {movie.tagline.length !== 0 && 
                      (<Card.Meta><Icon name='map outline'/>{movie.tagline}</Card.Meta>)}
                    <Card.Header as="h4"> </Card.Header>
                      <Card.Header style={{fontSize:headerTitleFontSize-20}}>개요</Card.Header>
                    <Card.Description>{movie.overview}</Card.Description>
                    <Card.Header as="h1"> </Card.Header>
                    
                    {(youtubeVideo.results.length !== 0) ?
                    <Button onClick={onClickWatchButton} primary>{youtubeVideo.results.length}Watch &nbsp;&nbsp;<Icon name='play circle outline'/></Button>
                    :
                    <Button onClick={onClickFakeButton}>{"Fake Watch"}<Icon name='play circle outline'/></Button>
                    }
                    
                      
                  </Card.Content>
                )}
              {/* </Card> */}
            </Grid.Column>
            
          </Grid.Row>          
        </Grid>
       
        <Divider hidden/>
        {/* <Card.Group centered itemsPerRow={2}>
        <Card color='red' key={movie.id} style={{ width: width, maxWidth: maxWidth, minHeight: minHeight, margin: 'auto' }}>
          {loading ? (
            <Placeholder fluid style={{minHeight: maxWidth}}>
              <Placeholder.Image/>
            </Placeholder>
          ) : 
          (
            <MovieCardImage movieName={movie.title} size = "medium" minHeight={minHeight} fontSize={48} imageUrl={'https://image.tmdb.org/t/p/w500/'+movie.poster_path}/>
          )}
          
  
        </Card>
        <Card color='yellow' key={movie.id} style={{ width: width, maxWidth: maxWidth, minHeight: minHeight, margin: 'auto' }}>
          {loading ? (
            <Placeholder>
              <Placeholder.Line/>
              <Placeholder.Line/>          
            </Placeholder>
          ) : (
            <Card.Content>
              <Card.Header style={{fontSize:35}}>{movie.title}</Card.Header>
              <Card.Meta><Icon name='tag'/> {movie.genres[0].name}</Card.Meta>
              <Card.Description><Rating icon='star' defaultRating={movie.vote_average} maxRating={10} /></Card.Description>
              <Card.Header as="h1"> </Card.Header>
              <Card.Description>{movie.overview}</Card.Description>
              <Card.Header as="h1"> </Card.Header>
                <Button onClick={() => { trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}`, UserId:`${UserId}` }); }}>
                  Watch &nbsp;<Icon name='play circle outline'/>
                </Button>
            </Card.Content>
          )}
  
        </Card>
        </Card.Group> */}
        <Divider hidden/>
        {/* <RecommendedMovieList recommendedMovies={recommendedMovies} title = "실시간 추천 리스트"/>
        <RecommendedMovieList recommendedMovies={recommendedMovies2} title = "배치(Daily) 추천 리스트"/> */}
        
      </Container>
    );
  };
  
  MovieDetails.propTypes = {
    id: PropTypes.string,
    locationState: PropTypes.object
  };

  export default MovieDetails;