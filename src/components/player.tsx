import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import { usePlayer, usePlayerProgress } from 'common/contexts/player';

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

  const {
    ref,
    load,
    isReady,
    prop,
    onBuffer,
    onPlayAndPause,
    nextMusic,
    handleDuration
  } = usePlayer();
  const {
    changeCurrentTimeTo,
    currentTime
  } = usePlayerProgress();

  const IsAllowed = prop.mode.includes('player:audio');

  useEffect(() => {
    document.addEventListener("contextmenu", e => e.preventDefault());
    return ()=> document.removeEventListener("contextmenu", e => e.preventDefault());
  },[]);

//  useEffect(() => {
//    if (!IsAllowed || !ref.audPlayer.current) return;
//    ref.audPlayer.current.seekTo(currentTime);
//  },[prop.mode]);

  return (
    <ViewPort>
      {prop.music &&
        <VideoPlayer
          ref={(reactPlayer: HTMLDivElement) => ref.audPlayer.current = reactPlayer}
          onReady={isReady}
          playing={IsAllowed && prop.playing}
          volume={prop.volume}
          loop={prop.loop}
          onPlay={()=> IsAllowed && onPlayAndPause(true)}
          onPause={()=> IsAllowed && onPlayAndPause(false)}
          onProgress={(time: {played: number, playedSeconds: number}) => {
            if (!prop.seeking && IsAllowed) {
              changeCurrentTimeTo(time.played, time.playedSeconds);
            }
          }}
          onDuration={(duration: number) => handleDuration(duration)}
          onBuffer={()=> IsAllowed && onBuffer(true)}
          onBufferEnd={()=> IsAllowed && onBuffer(false)}
          onEnded={()=> IsAllowed && nextMusic(1)}
          //onError={(e) => console.log(e)}
          url={`https://musiky-listen.herokuapp.com/chunk/${prop.music ? prop.music.id : ''}`}
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