export interface EventTarget {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

export interface SyntheticEvent {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget;
    timeStamp: Date;
    type: string;
}

export interface Music {
    id: string;
    title: string;
    originTitle: string;
    sourceBy: string;
    thumbnails: {
        medium: {
            url: string;
        }
    };
    duration: string;
    durationObj: {
        hour: number;
        minutes: number;
        seconds: number;
    };
    artists: Array<string>;
}

export interface PlaylistProps {
    id: string,
    infors: {
        playlistId: string;
        img: string;
        title: string;
        description: string;
        length: number;
        totalDuration: string;
    };
    key?: string;
    list?: Array<Music>;
}

export interface ArtistDataProps {
    name: string;
    images: Array<{ url: string }>;
    followers: {
        total: number;
    };
    genres: Array<string>;
}

export interface PlayerContextData {
    ref: {
        playerRef: any;
    };
    music: Music | null;
    setMusic: (s: Music | null) => void;
    playing: boolean;
    setPlaying: (s: boolean | ((s: boolean) => boolean)) => void;
    volume: number;
    setVolume: (s: number) => void;
    lastVolume: number;
    setLastVolume: (s: number) => void;
    showLyrics: boolean;
    setShowLyrics: (s: boolean | ((s: boolean) => boolean)) => void;
    loop: boolean;
    setLoop: (s: boolean | ((s: boolean) => boolean)) => void;
    currentTime: number;
    setCurrentTime: (s: number) => void;
    duration: number;
    setDuration: (s: number) => void;
    seeking : boolean;
    setSeeking: (s: boolean) => void;
    buffer: boolean;
    setBuffer: (s: boolean) => void;
    muted: boolean;
    setMuted: (s: boolean) => void;
}

export interface PlaylistContextData {
    playingIndex: number;
    setPlayingIndex: (s: number) => void;
    musiclist: Array<Music>;
    setMusiclist: (s: Array<Music>) => void;
    playlistId: string;
    setPlaylistId: (s: string) => void;
    playlistLoop: boolean;
    setPlaylistLoop: (s: boolean | ((s: boolean) => boolean)) => void;
    playListShuffle: boolean;
    setPlayListShuffle: (s: boolean | ((s: boolean) => boolean)) => void;
}

export interface LyricContextData {
    Lyric: {};
    setLyric: (s: {}) => void;
    currentLine: string;
    setCurrentLine: (s: string) => void;
    showLyrics: boolean;
    setShowLyrics: (s: boolean | ((s: boolean) => boolean)) => void;
}

export interface AccountContextData {
    auth: string;
    setAuth: (s: string) => void;
    displayName: string;
    setDisplayName: (s: string) => void;
    profileImg: string;
    setProfileImg: (s: string) => void;
}