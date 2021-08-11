class playerModule {
	constructor(){
        this._playerComponent = null
        this._playerSubscribe = null

        this._backgroundSubscribe = null

        this._playerControlSubscribe = null

        this._playlistSubscribe = null

        this._headerSubscribe = null

		this.musicId = null
		this.indexOnPlaylist = 0
		this.playlistId = ''
		this.musicList = []
		this.playing = false
		this.volume = 1
		this.lastVolume = 0
		this.showLyrics = false
		this.loop = false
		this.currentTime = 0
		this.duration = 0
		this.seeking = false
		this.buffer = false
		this.muted = false
	}


    setPlayerComponent(player, functionToNotify){
        this._playerComponent = player
        this._playerSubscribe = functionToNotify
    }

    setBackgroundFunction(functionToNotify){
        this._backgroundSubscribe = functionToNotify
    }

    setPlayerControlFunction(functionToNotify){
        this._playerControlSubscribe = functionToNotify
    }

    setPlaylistFunction(functionToNotify){
        this._playlistSubscribe = functionToNotify
    }

    setHeaderFunction(functionToNotify) {
        this._headerSubscribe = functionToNotify
    }


    notify(){
        this._playerSubscribe({ musicId: this.musicId, playing: this.playing, volume: this.volume, showLyrics: this.showLyrics, loop: this.loop })
        this._playerControlSubscribe({ indexOnPlaylist: this.indexOnPlaylist, playing: this.playing, loop: this.loop, musicList: this.musicList, currentTime: this.currentTime, volume: this.volume, lyricMode: this.showLyrics, buffer: this.buffer, muted: this.muted })
        this._headerSubscribe(this.showLyrics)
        this._playlistSubscribe(this.indexOnPlaylist)
        this._backgroundSubscribe( this.indexOnPlaylist, this.musicList )
    }


	load(targetIndex, targetList, playlistId='') {
		this.musicList = targetList
		this.indexOnPlaylist = targetIndex
        this.playlistId = playlistId
		this.musicId = targetList[targetIndex].id
		this.playing = true
        this.notify()
    }

    changeBufferStatusTo(status) {
        this.buffer = status
        this.notify()
    }

    nextMusic(action) {
	    this.indexOnPlaylist = this.indexOnPlaylist + action
        if (this.indexOnPlaylist === this.musicList.length){
            this.indexOnPlaylist = 0
        }

        this.playing = true
        this.musicId = this.musicList[this.indexOnPlaylist].id
        this.notify()
    }

    lyricsScreen() {
    	this.showLyrics = !this.showLyrics
        this.notify()
    }

    closeLyrics() {
        if(this.showLyrics) {
            this.showLyrics = false
            this.notify()            
        }
    }

    toggleLoop() {
    	this.loop = !this.loop
        this.notify()
    }

    play_Pause() {
    	this.playing = !this.playing
        this.notify()
    }

    seekTo(value) {
        this._playerComponent.seekTo(parseFloat(value));
    }

    setSeekingStatesTo(states) {
    	this.seeking = states
    }

    setCurrentTimeTo(played) {
    	if (!this.seeking) {
            this.currentTime = played
            this.notify()
        }
    }

    set setDuration(duration) {
    	this.duration = duration
        this.notify()
    }

    set setVolumeTo(value) {
    	if(this.muted){ this.muted = false }
        if(value === 0){ this.muted = true }
        this.volume = value
        this.notify()
    }

    toggleMuted() {
        if(this.muted){
            this.volume = this.lastVolume 
            this.muted = false
            this.notify()
            return
        }
        this.lastVolume = this.volume
        this.volume = 0
        this.muted = true
        this.notify()
    }

    get playingInplaylist() {
        return this.playlistId
    }

    get playingIndex() {
        return this.indexOnPlaylist
    }
}

export const player = new playerModule()
