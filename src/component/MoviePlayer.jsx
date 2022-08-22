// npm install react-player or yarn add react-player 로 라이브러리 설치
// dependency 오류
// npm install --force react-player로 설치한다.

import React from 'react'
import ReactPlayer from 'react-player'
function MoviePlayer() {
  const key = "qoEyZoOTtss";
  const url =  `https://www.youtube.com/watch?v=${key}`;
  console.log("[MoviePlayer] url :", url);
  return (
    <div>
      <h1 style={{ color: "white" }}>VIDEO</h1>
      <ReactPlayer 
        className="player"
        url={url}
        width="100%"
        height="calc(100vh - 100px)"
        playing={true}
        muted={true}
        controls={true}
        />      

    </div>
    
  )
}
export default MoviePlayer;