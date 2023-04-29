import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import { musikyStreamApi } from 'services';
import { usePlayer, usePlayerProgress } from 'contexts/player';

const ViewPort = Styled.section`
  position: fixed;
  background-color: transparent;
  padding-top: 16vh;
  overflow: hidden;
  height: 84vh;
  z-index: 3;
`
const VideoPlayer = Styled(ReactPlayer)`
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
`

const ReactPlayerComp: React.FC = () => {
  const [url, setUrl] = useState('');

  const {
    ref,
    isReady,
    prop,
    onBuffer,
    onPlayAndPause,
    nextMusic,
    handleDuration
  } = usePlayer();
  const {
    changeCurrentTimeTo
  } = usePlayerProgress();

  const isAllowed = prop.mode.includes('player:audio');

  useEffect(() => {
    document.addEventListener("contextmenu", e => e.preventDefault());
    return ()=> document.removeEventListener("contextmenu", e => e.preventDefault());
  },[]);


  // useEffect(() => {
  //   if (!prop.music) return;
  //   onPlayAndPause(false)
  //   setUrl(musiky.api.media(prop.music.id, "default"))
  //   onPlayAndPause(true)
  // },[prop.music])


  return (
    <ViewPort>
      {prop.music &&
        <VideoPlayer
          crossOrigin="anonymous"
          ref={(reactPlayer: HTMLDivElement) => ref.audPlayer.current = reactPlayer}
          onReady={isReady}
          playbackRate={1}
          playing={isAllowed && prop.playing}
          volume={prop.volume}
          loop={prop.loop}
          onPlay={()=> isAllowed && onPlayAndPause(true)}
          onPause={()=> isAllowed && onPlayAndPause(false)}
          onProgress={(time: {played: number, playedSeconds: number}) => {
            if (!prop.seeking && isAllowed) {
              changeCurrentTimeTo(time.played, time.playedSeconds);
           }
          }}
          onDuration={(duration: number) => handleDuration(duration)}
          onBuffer={()=> isAllowed && onBuffer(true)}
          onBufferEnd={()=> isAllowed && onBuffer(false)}
          onEnded={()=> isAllowed && nextMusic(1)}
          //onError={(e) => console.log(e)}
          url={`${musikyStreamApi}/${prop.music?.id}?source=${prop.music?.target}`}
          // url={url}
          width='100vw'
          height='100vh'
          hidden
          config={{
            file: {
              attributes: { autoPlay: 0, controls: 0 },
              forceAudio: true
            }
          }}
        />
      }
    </ViewPort>
  )
}

export default ReactPlayerComp;

//https://www.youtube-nocookie.com/embed/