class playerModule {
	constructor(){

        this._playerComponent = null

        this.observes =[]

        this._appBackground = null

        this.props = {

            musicId: null,
            indexOnPlaylist: 0,
            playlistId: '',
            musicList: [],
            playing: false,
            volume: 1,
            lastVolume: 0,
            showLyrics: false,
            loop: false,
            currentTime: 0,
            duration: 0,
            seeking: false,
            buffer: false,
            muted: false            
        }
	}

    subscribe(observerFunction) {
        const firstIndexSameTrue = this.observes.findIndex(f => f.name === observerFunction.name)
        if (firstIndexSameTrue < 0) {
            this.observes.push(observerFunction)
            return
        }
        this.observes[firstIndexSameTrue] = observerFunction
    }

    setPlayerComponentRef(player) {
        this._playerComponent = player
    }

    setBackgroundObserver(observerFunction) {
        this._appBackground = observerFunction
    }


    notify(){

        for(const observerFunction of this.observes){
            observerFunction(this.props)
        }
    }


	load(targetIndex, targetList, playlistId='') {
		this.props.musicList = targetList
		this.props.indexOnPlaylist = targetIndex
        this.props.playlistId = playlistId
		this.props.musicId = targetList[targetIndex].id
        this.changeBufferStatusTo(true)
        this.updateAppBackground()
    }

    updateAppBackground() {
        this._appBackground(this.props.indexOnPlaylist, this.props.musicList)
    }

    changeBufferStatusTo(status) {
        this.props.buffer = status
        this.notify()
    }

    nextMusic(action) {
	    this.props.indexOnPlaylist = this.props.indexOnPlaylist + action
        if (this.props.indexOnPlaylist === this.props.musicList.length){
            this.props.indexOnPlaylist = 0
        }

        this.props.musicId = this.props.musicList[this.props.indexOnPlaylist].id
        this.updateAppBackground()
        this.notify()
    }

    lyricsScreen() {
    	this.props.showLyrics = !this.props.showLyrics
        this.notify()
    }

    closeLyrics() {
        if(this.props.showLyrics) {
            this.props.showLyrics = false
            this.notify()            
        }
    }

    toggleLoop() {
    	this.props.loop = !this.props.loop
        this.notify()
    }

    play_Pause() {
    	this.props.playing = !this.props.playing
        this.notify()
    }

    changePlayingTo(status) {
        this.props.playing = status
    }

    seekTo(value) {
        this._playerComponent.seekTo(parseFloat(value));
    }

    setSeekingStatesTo(states) {
    	this.props.seeking = states
    }

    setCurrentTimeTo(played) {
    	if (!this.props.seeking) {
            this.props.currentTime = played
            this.notify()
        }
    }

    set setDuration(duration) {
    	this.props.duration = duration
        this.notify()
    }

    set setVolumeTo(value) {
    	if(this.props.muted){ this.props.muted = false }
        if(value === 0){ this.props.muted = true }
        this.props.volume = value
        this.notify()
    }

    toggleMuted() {
        if(this.props.muted){
            this.props.volume = this.props.lastVolume 
            this.props.muted = false
            this.notify()
            return
        }
        this.props.lastVolume = this.props.volume
        this.props.volume = 0
        this.props.muted = true
        this.notify()
    }
}

export const player = new playerModule()
