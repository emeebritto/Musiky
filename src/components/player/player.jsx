import React, { useState, useEffect } from "react";

import { ViewPort, VideoPlayer, Blocker } from "./playerStyles";

function ReactPlayer({ player }) {

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
        player.changeBufferStatusTo = status
    }

    const onEnded = () => {
        player.nextMusic(1)
    }


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
                onProgress={time =>{ handleProgress(time) }}
                onDuration={duration => { handleDuration(duration) }}
                onBuffer={() => onBuffer(true)}
                onBufferEnd={() => onBuffer(false)}
                onEnded={() => { onEnded() }}
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

export default ReactPlayer;
