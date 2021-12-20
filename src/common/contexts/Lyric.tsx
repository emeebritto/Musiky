import React, { useContext, useEffect } from 'react';
import { EventTarget, SyntheticEvent } from 'common/types';
import { getLyric } from 'api';
import { LyricContext } from './providers/Lyric-provider';
import { usePlayerContext } from './Player';


export function useLyricContext(){

	const {
        Lyric,
        setLyric,
        currentLine,
        setCurrentLine,
        showLyrics,
        setShowLyrics
	} = useContext(LyricContext);

    const { prop } = usePlayerContext();
	

// ==================================================================

    const toggleLyrics = (changeTo: boolean =false): void => {
        if(changeTo) {
            setShowLyrics(changeTo);
            return
        };
        setShowLyrics((showLyrics: boolean) => !showLyrics);
    }

    useEffect(()=>{
        if (!prop.music) return;
        let title = prop.music.title;
        let artistRef = prop.music.artists[0];
        async function getData() {
            setLyric(await getLyric({ title, artistRef }));
        }
        getData();
    },[])

    useEffect(()=>{
        if(!Lyric[prop.currentTimeSeconds]) return
        setCurrentLine(Lyric[prop.currentTimeSeconds])
    },[prop.currentTimeSeconds])

    return {
        lyricProp: {
            currentLine,
            showLyrics
        },
        toggleLyrics
    }
}