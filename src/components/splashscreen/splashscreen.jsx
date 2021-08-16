import React from 'react'

import branding from "../../assets/img/branding_Musiky.png"

import Styled from "styled-components";

const ViewPort = Styled.section`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 5;
	width: 100vw;
	height: 100vh;
	background-color: black;
`

const AppBranding = Styled.img`
	width: 220px;
	animation: start 6s infinite alternate;

	@keyframes start {
		0% {
			transform: translateY(-25px);
		}
		50% {
			transform: translateY(0px);
		}

		100% {
			transform: translateY(-25px);
		}
	}
`

const Splashscreen = () => {

	return(
		<ViewPort>
			<AppBranding src={branding} alt="musyk_logo"/>
		</ViewPort>
	)
}

export default Splashscreen