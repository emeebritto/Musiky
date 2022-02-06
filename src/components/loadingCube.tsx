import React from 'react';
import Styled from "styled-components";


const Cube = Styled.section`
	position: absolute;
	right: 60px;
	bottom: 40px;
	width: 20px;
	height: 20px;
	z-index: 100;
	background-color: ${(props: {error: boolean}) => (
		props.error ? "#FF0000" : "#fff"
	)};
	border-radius: 3px;
	filter: drop-shadow(0px 0px 20px ${(props: {error: boolean}) => (
		props.error ? "#FF0000" : "#fff"
	)});
	animation: roll ${(props: {error: boolean}) => (
		props.error ? "10s" : "2s"
	)} infinite;

	@keyframes roll {
        to {
            transform: rotate(360deg);
        }
    }
`

interface TabTitleProps {
    error?: boolean;
}

const LoadingCube: React.FC<TabTitleProps> = ({ error=false }) => (
	<Cube error={error}/>
)


export default LoadingCube;