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
        setShowLyrics,
        hasLyric,
        setHasLyric
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
        setCurrentLine('waiting for the best moment..');
        let title = prop.music.title;
        let artistRef = prop.music.artists[0];
        async function getData() {
            setLyric(await getLyric({ title, artistRef }));
        }
        getData();
    },[prop.music])

    useEffect(()=>{
        if(!Lyric[prop.currentTimeSeconds]) return
            console.log(Lyric[prop.currentTimeSeconds]);
        setCurrentLine(Lyric[prop.currentTimeSeconds])
    },[prop.currentTimeSeconds])

    useEffect(()=>{
        setHasLyric(Boolean(Object.keys(Lyric).length));
    },[Lyric])

    return {
        lyricProp: {
            currentLine,
            showLyrics,
            hasLyric
        },
        toggleLyrics
    }
}