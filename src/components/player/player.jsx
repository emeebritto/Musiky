import React, { useState, useEffect } from 'react'

import { player } from '../../controllers'

import ReactPlayer from 'react-player'
import Styled from 'styled-components'

const ViewPort = Styled.section`
    position: absolute;
    background-color: transparent;
    padding-top: 16vh;
    overflow: hidden;
    height: 84vh;
    z-index: 2;
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

    const [ playerProp, setPlayerProp ] = useState({})


    const UpdatePlayerState = props => {
        setPlayerProp({...props})
    }

    const handleProgress = time => {
        player.setCurrentTimeTo(time.played)
    }

    const handleDuration = duration => {
        player.setDuration = duration
    }

    const onBuffer = status => {
        player.changeBufferStatusTo(status)
    }

    const onEnded = () => {
        player.nextMusic(1)
    }

    const onError = () => {
        if(playerProp.length){
            onEnded()
        }
    }

    const handleContextMenu = e => {
        e.preventDefault();
    }

    useEffect(()=>{
        document.addEventListener("contextmenu", (e)=> handleContextMenu(e));
        return ()=> document.removeEventListener("contextmenu", (e)=> handleContextMenu(e))
    },[])


    const ref = reactPlayer => {
        player.setPlayerComponent(reactPlayer, UpdatePlayerState)
    }


    return (
        <ViewPort style={{ width: playerProp.showLyrics? '100vw': '0vw' }}>
            <VideoPlayer
                ref={reactPlayer => { ref(reactPlayer) }}
                playing={playerProp.playing}
                volume={playerProp.volume}
                loop={playerProp.loop}
                onProgress={time => handleProgress(time) }
                onDuration={duration =>  handleDuration(duration) }
                onBuffer={() => onBuffer(true)}
                onBufferEnd={() => onBuffer(false)}
                onEnded={() =>  onEnded() }
                onError={() => onError() }
                url={`https://www.youtube-nocookie.com/embed/${playerProp.musicId}`}
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
