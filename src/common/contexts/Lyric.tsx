import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { EventTarget, SyntheticEvent } from 'common/types';
import { IstaticBaseUrl } from 'services';
import { LyricContext } from './providers/Lyric-provider';
import { usePlayer, usePlayerProgress } from './player';


export function useLyricContext() {

	const {
        lyric,
        setLyric,
        currentLine,
        setCurrentLine,
        currentIndex,
        setCurrentIndex,
        showLyrics,
        setShowLyrics,
        hasLyric,
        setHasLyric
	} = useContext(LyricContext);

    const { prop } = usePlayer();
    const { currentTimeSec } = usePlayerProgress();
	

// ==================================================================

    const toggleLyrics = (changeTo: boolean=false): void => {
        if(changeTo) {
            setShowLyrics(changeTo);
            return
        };
        setShowLyrics((showLyrics: boolean) => !showLyrics);
    }

    const getFullLyric = () => {
        return Object.values(lyric);
    }

    const getLyricTimeRef = () => {
        return Object.keys(lyric);
    }

    const fullLyricCurrentLine = (currentTimeSeconds: number): void => {
        let index = Object.keys(lyric).findIndex(value => {
            return Number(value) == currentTimeSeconds
        });
        setCurrentIndex(index);
    };

    useEffect(()=>{
        if (!prop.music) return;
        setCurrentLine('waiting for the best moment..');
        let title = prop.music.title;
        let artistRef = prop.music.artists[0];
        async function getData() {
            setLyric(
                await axios
                    .get(`${IstaticBaseUrl}music/lyric?title=${title}&artistRef=${artistRef}`)
                    .then(r=>r.data)
            );
        }
        getData();
    },[prop.music])

    useEffect(()=>{
        if(lyric[currentTimeSec]) {
            setCurrentLine(lyric[currentTimeSec]);
            fullLyricCurrentLine(currentTimeSec);
        } else if (lyric[currentTimeSec -1]) {
            setCurrentLine(lyric[currentTimeSec -1]);
            fullLyricCurrentLine(currentTimeSec -1);
        } else if (lyric[currentTimeSec -2]) {
            setCurrentLine(lyric[currentTimeSec -2]);
            fullLyricCurrentLine(currentTimeSec -2);
        }
    },[currentTimeSec])

    useEffect(()=>{
        setHasLyric(!!Object.keys(lyric).length);
    },[lyric])

    return {
        lyricProp: {
            currentIndex,
            currentLine,
            showLyrics,
            hasLyric
        },
        getFullLyric,
        getLyricTimeRef,
        toggleLyrics
    }
}