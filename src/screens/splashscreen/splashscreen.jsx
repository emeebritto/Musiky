import React from 'react'

import branding from "assets/img/branding_Musiky.png"

import Styled from "styled-components";

const ViewPort = Styled.section`
    padding-top: 70px;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
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

    @media(max-width: 550px) {
        width: 180px;
    }
`

const Author = Styled.h1`
	margin-top: 160px;
	color: white;
	font-size: 1.6em;
	opacity: 25%;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

    @media(max-width: 550px) {
        font-size: 1.4em;
    }
`

const Splashscreen = () => {

	return(
		<ViewPort>
			<AppBranding src={branding} alt="musyk_logo"/>
			<Author>By Emerson Britto</Author>
		</ViewPort>
	)
}

export default Splashscreen