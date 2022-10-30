import React from "react";
import Styled from "styled-components";
import istatic from "services/istatic";


const ViewPort = Styled.section`
  padding-top: 70px;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	z-index: 99;
	width: 100vw;
	height: 100vh;
	background-color: #020309;

	a {
		text-decoration: none;
	}
`
const BrandingWrapper = Styled.section`
	height: 10vh;
	-webkit-box-reflect: below 40px linear-gradient(to top, rgba(0,0,0,0), rgb(0,0,0));
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
	margin-top: 15vh;
	color: white;
	font-size: 1.4em;
	opacity: 25%;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

  @media(max-width: 550px) {
    font-size: 1.4em;
  }
`

const SplashScreen: React.FC = () => (
	<ViewPort>
		<BrandingWrapper>
			<AppBranding
				src={istatic.imgUrl({ path: "branding/branding_Musiky.png" })}
				alt="musiky branding"
			/>
		</BrandingWrapper>
		<a
      href="https://www.linkedin.com/in/emerson-britto/"
      target="_blank"
      rel="noopener noreferrer"
    >
			<Author>Powered by <strong>emee</strong></Author>
		</a>
	</ViewPort>
)

export default SplashScreen;
