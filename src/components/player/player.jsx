import React, { useEffect } from 'react';

import { usePlayerContext } from 'common/contexts/Player';

import ReactPlayer from 'react-player';
import Styled from 'styled-components';

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

const ReactPlayerComp = () => {

    const {
        ref,
        prop,
        onBuffer,
        onPlayAndPause,
        nextMusic,
        changeCurrentTimeTo,
        handleDuration
    } = usePlayerContext();


    useEffect(()=>{

        document.addEventListener("contextmenu", e => e.preventDefault());
        return ()=> document.removeEventListener("contextmenu", e => e.preventDefault());

    },[])



    return (
        <ViewPort style={{ width: prop.showLyrics? '100vw': '0vw' }}>
            <VideoPlayer
                ref={reactPlayer => ref.playerRef = reactPlayer}
                playing={prop.playing}
                volume={prop.volume}
                loop={prop.loop}
                onPlay={() => onPlayAndPause(true)}
                onPause={() => onPlayAndPause(false)}
                onProgress={time => changeCurrentTimeTo(time.played)}
                onDuration={duration =>  handleDuration(duration)}
                onBuffer={() => onBuffer(true)}
                onBufferEnd={() => onBuffer(false)}
                onEnded={() => nextMusic(1)}
                onError={() => nextMusic(1)}
                url={`https://www.youtube-nocookie.com/embed/${prop.music ? prop.music.id : ''}`}
                width='100vw'
                height='100vh'
                config={{
                    youtube: {
                      playerVars: { showinfo: 0, autoplay: 1, controls: 0 }
                    }
                }}
            />
            <Blocker/>
        </ViewPort >
    )
}

export default ReactPlayerComp;
