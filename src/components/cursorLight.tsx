import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';


const Light = Styled.section`
	position: absolute;
	width: 60px;
	height: 60px;
	z-index: 0;
	border-radius: 50%;
	box-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
	background-color: rgba(255, 255, 255, 0.03);
`


const Cursorlight: React.FC = () => {

	const [showLight, setShowLight] = useState(true);
	const [clientX, setClientX] = useState(0);
	const [clientY, setClientY] = useState(0);

	const updateLightPosition = ({ clientX, clientY }) => {
		if(clientX < (window.screen.width - 10)) {
			setShowLight(true);
		} else {
			setShowLight(false);
		}
		setClientX(clientX);
    	setClientY(clientY);		
	}

	useEffect(()=>{
	    document.addEventListener("mousemove", e => updateLightPosition(e));
	    return document.removeEventListener("mousemove", e => updateLightPosition(e));
	},[])

	return (
		<Light style={{ 
			display: showLight ? 'flex' : 'none',
			left: clientX -30,
			top: clientY -30
		}}/>
	);
}

export default Cursorlight;
