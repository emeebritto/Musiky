
// NOTE: a new system using CONTEXT API is under developement
// NOTE: a new system using CONTEXT API is under developement

class playerModule {
	constructor(){

        this._playerComponent = null

        this.observes =[]

        this._appBackground = null

        this.props = {

            musicId: null, // get
            indexOnPlaylist: 0,// get
            playlistId: '',// get
            musicList: [],// get
            playedMusic: [],// null
            playing: false,// get
            volume: 1,// get
            lastVolume: 0, // get
            showLyrics: false, // get
            playlistLoop: false, // get
            playListShuffle: false, // get
            loop: false, // get
            currentTime: 0, // get
            duration: 0, // get
            seeking: false, // get
            buffer: false, // get
            muted: false // get
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
	    this.props.indexOnPlaylist = this.props.playListShuffle 
                ? ~~(Math.random() * this.props.musicList.length - 1) 
                : this.props.indexOnPlaylist + action

        if (this.props.indexOnPlaylist === this.props.musicList.length){

            if(this.props.playlistLoop){
                this.props.indexOnPlaylist = 0
            } else {
                this.props.indexOnPlaylist = this.props.musicList.length - 1
                this.props.playing = false
            }
            
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

    toggleShuffle() {
        this.props.playListShuffle = !this.props.playListShuffle
        this.props.musicList.length && this.notify()
    }

    togglePlaylistLoop() {
        this.props.playlistLoop = !this.props.playlistLoop
        this.props.musicList.length && this.notify()
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
