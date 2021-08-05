class local_db {
    constructor(){
        this._functionsStorage = {};
        this._dataStorage = {};
        this._stateStorage = {};
    }

    setToBase(key, value, local){
        if (local[key] === undefined) { local[key] = value; return };
        //throw new Error(`Storage: ${key} has already been defined`);
    }


    setFunction(key, value){
        this.setToBase( key, value, this._functionsStorage)
    }

    getFunction(key){
        return this._functionsStorage[key]
    }


    setData(key, value){ 
        this.setToBase( key, value, this._dataStorage)
    }

    getData(key){
        return this._dataStorage[key]
    }
}

export const db = new local_db()


class Playing {
    constructor(){
        this.playlistId = ''
        this.musicList = []
        this.musicIndex = 0
        this._subscribes = []
    }

    subscribe(func){
        this._subscribes.push(func)
    }

    unsubscribe(func){
        this._subscribes = this._subscribes.filter(f => f !== func)
    }

    notify(){
        this._subscribes.forEach(func =>{
            func(this.musicIndex, this.musicList)
        } );
    }


    nextAndBack_Music(action){
        if (this.musicIndex === this.musicList.length -1){
            this.musicIndex = 0;
            this.notify()
            return
        }
        this.musicIndex = this.musicIndex + action
        this.notify()
    }

    startNewList(targetIndex, targetList, local=''){
        this.musicIndex = targetIndex
        this.musicList = targetList
        this.playlistId = local;
        this.notify()
    }

    get playlistActive(){
        return this.playlistId
    }

    get playingIndex(){
        return this.musicIndex
    }
}

export const PlayingNow = new Playing()