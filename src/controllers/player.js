class player {
	constructor(){
		this.musicId = null
		this.indexOnPlaylist = 0
		this.playlistId = null
		this.musicList = []
		this.playing = false
		this.volume = 0
		this.lastVolume = 0
		this.showLyrics = false
		this.loop = false
		this.currentTime = 0
		this.duration = 0
		this.seeking = false
		this.Buffer = false
		this.muted = false
	}


	load(targetIndex, targetList) {
		this.musicList = targetList
		this.indexOnPlaylist = targetIndex
		this.musicId = targetList[targetIndex].id
		this.playing = true
    }

    bufferStatus(status) {
        this.Buffer = status
    }

    nextMusic(action) {
        if (this.indexOnPlaylist === this.musicList.length -1){
            this.indexOnPlaylist = 0;
            this.notify()
            return
        }
	    this.indexOnPlaylist = this.indexOnPlaylist + action
	    this.notify()
	    this.playing = false
    }

    lyricsScreen() {
    	this.showLyrics = !this.showLyrics
    }

    closeLyrics() {
        this.showLyrics = false
    }

    loop() {
    	this.loop = !this.loop
    }

    play_Pause() {
    	this.playing = !this.playing
    }

    set setSeekingStatesTo(states) {
    	this.seeking = states
    }

    set setCurrentTimeTo(time) {
    	if (!this.seeking) {
            this.currentTime = time.played
        }
    }

    set setDuration(duration) {
    	this.duration = duration
    }

    set setVolumeTo(value) {
    	if(this.muted){ this.muted = false }
        if(value === 0){ this.muted = true }
        this.volume = value
    }

    toggleMuted() {
        if(this.muted){
            this.volume = this.lastVolume 
            this.muted = false
            return
        }
        this.lastVolume = this.volume
        this.volume = 0
        this.muted = true
    }
}
