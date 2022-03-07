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

  useEffect(()=> {
    document.addEventListener("contextmenu", e => e.preventDefault());
    return ()=> document.removeEventListener("contextmenu", e => e.preventDefault());
  },[])

  useEffect(()=>{
    if (!prop.mode['only_audio'] || !ref.audPlayer.current) return;
    ref.audPlayer.current.seekTo(currentTime);
  },[prop.mode])

  return (
    <ViewPort>
      {prop.music &&
        <VideoPlayer
          ref={(reactPlayer: HTMLDivElement) => ref.audPlayer.current = reactPlayer}
          playing={prop.mode['only_audio'] && prop.playing}
          volume={prop.volume}
          loop={prop.loop}
          onPlay={()=> prop.mode['only_audio']? onPlayAndPause(true):false}
          onPause={()=> prop.mode['only_audio']? onPlayAndPause(false):false}
          onProgress={(time: {played: number, playedSeconds: number}) => {
            if (!prop.seeking && prop.mode['only_audio']) {
              changeCurrentTimeTo(time.played, time.playedSeconds);
            }
          }}
          onDuration={(duration: number) => handleDuration(duration)}
          onBuffer={()=> onBuffer(true)}
          onBufferEnd={()=> onBuffer(false)}
          onEnded={()=> prop.mode['only_audio']? nextMusic(1):false}
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