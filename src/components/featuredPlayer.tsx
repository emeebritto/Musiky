import React from 'react';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import { useFeaturedContext } from 'common/contexts/Featured';


const ViewPort = Styled.section`
  position: fixed;
  background-color: transparent;
  padding-top: 16vh;
  overflow: hidden;
  height: 84vh;
  z-index: 3;
`

const FeaturedPlayer: React.FC = () => {
  const { playingAud, AudId, AudVol } = useFeaturedContext();
  return (
    <ViewPort>
      {(!!AudId && playingAud) &&
      <ReactPlayer
        playing={playingAud}
        volume={AudVol}
        url={`https://musiky-listen.herokuapp.com/${AudId}?source=${'yt'}`}
        hidden
        config={{
          file: {
            attributes: { autoPlay: 1, controls: 0 },
            forceAudio: true
          }
        }}
      />
      }
    </ViewPort>
  )
}

export default FeaturedPlayer;
