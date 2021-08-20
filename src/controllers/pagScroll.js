class pagScroll {
	constructor(){
		this.viewPort = null
	}

	setViewRef(view){
		if(view !== null){
			this.viewPort = view
		}
	}

	to(obj){
		this.viewPort.scrollTo(obj)
	}

	toTop(){
		this.viewPort.scrollTo({top:0, left:0})
	}
}

export const scroll = new pagScroll()