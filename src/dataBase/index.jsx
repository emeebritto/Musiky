const _functionsStorage = {};
const _dataStorage = {};
const _stateStorage = {};

const setToBase = (key, value, local) => {
    if (local[key] === undefined) { local[key] = value; return };
    //throw new Error(`Storage: ${key} has already been defined`);
}

const setFunction = (key, value) => { setToBase( key, value, _functionsStorage);}
const getFunction = (key) => {
    return _functionsStorage[key]
}

const setData = (key, value) => { setToBase( key, value, _dataStorage);}
const getData = (key) => {
    return _dataStorage[key]
}

const setState = (key, value) => { setToBase( key, value, _stateStorage);}
const getState = (key) => {
    return _stateStorage[key]
}

export const dataBase = {
    setFunction, getFunction,
    setData, getData,
    setState, getState
}

class Playing {
    constructor(){
        this.playlistId = ''
        this.musicList = []
        this.musicIndex = 0
        this._subscribes = []
    }

    subscribe(func){
        console.log('inscreveu')
        console.log(func)
        this._subscribes.push(func)
    }

    unsubscribe(func){
        console.log('desincreveu')
        console.log(func)
        this._subscribes = this._subscribes.filter(f => f !== func)
    }

    notify(){
        console.log('executando notify')
        this._subscribes.forEach(func =>{
            func(this.musicIndex, this.musicList)
        } );
    }


    nextAndBack_Music(action){
        console.log(this.musicList)
        if (this.musicIndex === this.musicList.length -1){
            this.musicIndex = 0;
            this.notify()
            return
        }
        this.musicIndex = this.musicIndex + action
        this.notify()
    }

    startNewList(targetIndex, targetList, local=''){
        console.log(targetIndex)
        console.log(targetList)
        this.musicIndex = targetIndex
        this.musicList = targetList
        this.playlistId = local;
        this.notify()
    }

    playlistActive(){
        return this.playlistId
    }

    playingIndex(){
        return this.musicIndex
    }
}

export const PlayingNow = new Playing()