import React from 'react'

import Styled from "styled-components";

const ViewPort = Styled.section`
	position: absolute;
	z-index: 5;
	height: 0.3vh;
	background-color: white;
	transition: 800ms;
    animation: ${(props) => (props.loading ? "start-loading 15s forwards" : "end-loading 1s")};

	@keyframes start-loading {
		0% {
			width: 0vw;
		}

		40% {
			width: 30vw;
		}

		100% {
			width: 60vw;
		}
	}

	@keyframes end-loading {
		0% {
			width: 60vw;
		}

		100% {
			width: 99vw;
		}
	}
`

const TransitionLoadingBar = ({ loadingStates }) => {

	const [splash, pageLoadingBar] = loadingStates.values

	var loadingOn = true

	if(pageLoadingBar.contentLoaded){

		loadingOn = false

		setTimeout(()=> {
			loadingStates.setPageLoadingBar({loadingBar: false, contentLoaded: false}) // reset to default
		}, 1000)
	}

	return(
		<ViewPort loading={loadingOn}></ViewPort>
	)
}

export default TransitionLoadingBar