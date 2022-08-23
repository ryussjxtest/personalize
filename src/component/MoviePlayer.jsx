// npm install react-player or yarn add react-player 로 라이브러리 설치
// dependency 오류
// npm install --force react-player로 설치한다.

import React from 'react'
import ReactPlayer from 'react-player'

// function MoviePlayer(){
function MoviePlayer(props) {
  //  <MoviePlayer finalYoutubeVideo={finalYoutubeVideo} open={modalOpen} close={closeModal}>
  const  {finalYoutubeVideo, open, close} = props; 
 
  console.log("[MoviePlayer] from props youtubeVideo",finalYoutubeVideo);
  // id: "5b6b42da0e0a267eed126e2b"
  // iso_639_1: "en"
  // iso_3166_1: "US"
  // key: "NODxOb3hgag"
  // name: "Secret in Their Eyes - Trailer"
  // official: false
  // published_at: "2016-06-23T03:59:01.000Z"
  // site: "YouTube"
  // size: 1080
  // type: "Trailer"
  console.log(`[MoviePlayer] name: ${finalYoutubeVideo.name}`);
  console.log(`[MoviePlayer] key: ${finalYoutubeVideo.key}`);
  console.log(`[MoviePlayer] size: ${finalYoutubeVideo.size}`);
  console.log(`[MoviePlayer] open: ${typeof open}`);
  console.log(`[MoviePlayer] close: ${typeof close}`);

  const key = finalYoutubeVideo.key;
  const url =  `https://www.youtube.com/watch?v=${key}`;
  console.log("[MoviePlayer] url :", url);
  
  return (
    // <div>
    //   <h1 style={{ color: "white" }}>VIDEO</h1>
    //   <ReactPlayer 
    //     className="player"
    //     url={url}
    //     width="100%"
    //     height="100%"
    //     playing={true}
    //     muted={true}
    //     controls={true}
    //     />      

    // </div>
    <div className={open ? 'openModal modal' : 'modal'}>
      
      {open ? (
        <section>
          <header>
            {finalYoutubeVideo.name}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
          <ReactPlayer 
            className="react-player" 
            url={url} 
            width="100%" 
            height="100%" 
            muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
            playing={true} 
            loop={true} />
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  )
}
export default MoviePlayer;