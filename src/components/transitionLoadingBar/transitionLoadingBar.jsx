import React from 'react'

import Styled from "styled-components";

const ViewPort = Styled.section`
	position: absolute;
	z-index: 5;
	height: 0.3vh;
	background-color: white;
	transition: 800ms;
    animation: start-loading ${(props) => (props.loadingOn ? "10s" : "1s")};

	@keyframes start-loading {
		0% {
			width: 0vw;
		}

		40% {
			width: 30vw;
		}

		100% {
			width: 100vw;
		}
	}
`

const TransitionLoadingBar = ({loadingStates}) => {

	var loadingOn = true

	if(loadingStates.values.contentLoaded){
		loadingOn = false
		loadingStates.pagLoading({loadingBar: false, contentLoaded: false})
	}

	return(
		<ViewPort loading={loadingOn}></ViewPort>
	)
}

export default TransitionLoadingBar