import React from 'react';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import { useBackPlayerContext } from 'common/contexts/backPlayer';


const ViewPort = Styled.section`
    position: fixed;
    background-color: transparent;
    padding-top: 16vh;
    overflow: hidden;
    height: 84vh;
    z-index: 3;
`

const BackPlayer: React.FC = () => {

  const { playing, id } = useBackPlayerContext();

  return (  
    <ViewPort>
      {!!id &&
      <ReactPlayer
        playing={playing}
        volume={0.6}
        url={`https://musiky-listen.herokuapp.com/${id}`}
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

export default BackPlayer;
