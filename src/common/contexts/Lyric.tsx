import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { EventTarget, SyntheticEvent } from 'common/types';
import { IstaticBaseUrl } from 'api';
import { LyricContext } from './providers/Lyric-provider';
import { usePlayerContext } from './Player';


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

    const { prop } = usePlayerContext();
	

// ==================================================================

    const toggleLyrics = (changeTo: boolean =false): void => {
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
        if(lyric[prop.currentTimeSeconds]) {
            setCurrentLine(lyric[prop.currentTimeSeconds]);
            fullLyricCurrentLine(prop.currentTimeSeconds);
        } else if (lyric[prop.currentTimeSeconds -1]) {
            setCurrentLine(lyric[prop.currentTimeSeconds -1]);
            fullLyricCurrentLine(prop.currentTimeSeconds -1);
        } else if (lyric[prop.currentTimeSeconds -2]) {
            setCurrentLine(lyric[prop.currentTimeSeconds -2]);
            fullLyricCurrentLine(prop.currentTimeSeconds -2);
        }
    },[prop.currentTimeSeconds])

    useEffect(()=>{
        setShowLyrics(!!Object.keys(lyric).length);
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