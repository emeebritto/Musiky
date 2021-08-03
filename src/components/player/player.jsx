import React, { useState, useEffect } from "react";
import { dataBase as data } from "../../dataBase"

import { ViewPort, VideoPlayer, Blocker } from "./playerStyles";

function Player({playingNow}) {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [lyrics, setLyrics] = useState(false);
    const [loop, setLoop] = useState(false);
    const [music, setMusic] = useState('');
    const [playerProp, setPlayerProp] = useState({
        currentTime: 0,
        duration: 0
    })

    const loadPlayer = (targetIndex, targetList) => {
        setMusic(targetList[targetIndex].id)
        setPlaying(true)
    }

    const lyricsScreen = () => {
        setLyrics(lyrics => !lyrics)
    }

    const closeLyrics = () => {
        setLyrics(false)
    }

    const playerLoop = () => {
        setLoop(loop => !loop)
    }

    const play_Pause = () => {
        setPlaying(playing => !playing)
    }

    const VolumeChange = value => {
        setVolume(value)
    }

    const handleProgress = state => {
        data.getFunction('slideBarProgress')(state)
    }

    const handleDuration = duration => {
        setPlayerProp({...playerProp, duration: duration })
    }

    const onBuffer = status => {
        data.getFunction('loadingStatus')(status)
    }

    const onEnded = () => {
        playingNow.nextAndBack_Music(1)
        //data.getFunction('nextAndBack_Music')()
    }

    useEffect(()=>{
        playingNow.subscribe(loadPlayer)
        return ()=>{ playingNow.unsubscribe(loadPlayer)}
    },[])

    const ref = player => {
        data.setData('videoPlayer', player)
        data.setFunction('playerLoop', playerLoop)
        data.setFunction('play_Pause', play_Pause)
        data.setFunction('lyricsScreen', lyricsScreen)
        data.setFunction('closeLyrics', closeLyrics)
        data.setFunction('VolumeChange', VolumeChange)
    }

    return (
        <ViewPort style={{ width: lyrics? '100vw': '0vw' }}>
            <VideoPlayer
                ref={player => { ref(player) }}
                playing={playing}
                volume={volume}
                loop={loop}
                onProgress={e =>{ handleProgress(e) }}
                onDuration={e => { handleDuration(e) }}
                onBuffer={() => onBuffer(true)}
                onBufferEnd={() => onBuffer(false)}
                onEnded={()=>{ onEnded() }}
                url={`https://www.youtube-nocookie.com/embed/${music}`}
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

export default Player;
