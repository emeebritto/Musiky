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

const Blocker = Styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  const { changeCurrentTimeTo } = usePlayerProgress();

  useEffect(()=> {
    document.addEventListener("contextmenu", e => e.preventDefault());
    return ()=> document.removeEventListener("contextmenu", e => e.preventDefault());
  },[])


  return (
    <ViewPort>
      {prop.music &&
        <VideoPlayer
          ref={(reactPlayer: HTMLDivElement) => ref.playerRef = reactPlayer}
          playing={prop.playing}
          volume={prop.volume}
          loop={prop.loop}
          onPlay={() => onPlayAndPause(true)}
          onPause={() => onPlayAndPause(false)}
          onProgress={(time: {played: number, playedSeconds: number}) => {
            if (!prop.seeking) {
              changeCurrentTimeTo(time.played, time.playedSeconds);
            }
          }}
          onDuration={(duration: number) => handleDuration(duration)}
          onBuffer={() => onBuffer(true)}
          onBufferEnd={() => onBuffer(false)}
          onEnded={() => nextMusic(1)}
          onError={() => nextMusic(1)}
          url={`https://musiky-listen.herokuapp.com/chunk/${prop.music ? prop.music.id : ''}`}
          width='100vw'
          height='100vh'
          hidden
          config={{
            file: {
              attributes: { autoPlay: 1, controls: 0 },
              forceAudio: true
            }
          }}
        />
      }
      <Blocker/>
    </ViewPort>
  )
}

export default ReactPlayerComp;

//https://www.youtube-nocookie.com/embed/