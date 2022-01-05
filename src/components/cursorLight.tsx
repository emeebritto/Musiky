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
	const [scale, setScale] = useState(1);
	const [opacity, setOpacity] = useState(1);

	const updateLightPosition = (pos: {clientX: number, clientY: number}): void => {
		if(pos.clientX < (window.innerWidth - 10)) {
			setShowLight(true);
		} else {
			setShowLight(false);
		}
		setClientX(pos.clientX);
    	setClientY(pos.clientY);		
	};

	const explosionWithFade = () => {
		setScale(1.6);
		setOpacity(0);
		setTimeout(()=> {
			setScale(1);
			setOpacity(1);
		}, 300);
	};


	useEffect(()=>{
	    document.addEventListener("mousemove", e => updateLightPosition(e));
	    return document.removeEventListener("mousemove", e => updateLightPosition(e));
	},[])

	useEffect(()=>{
	    document.addEventListener("click", ()=> explosionWithFade());
	    return document.removeEventListener("click", ()=> explosionWithFade());
	},[])

	return (
		<Light style={{ 
			display: showLight ? 'flex' : 'none',
			left: clientX -30,
			top: clientY -30,
			opacity: opacity,
			transform: `scale(${scale})`,
			transition: 'transform 200ms, opacity 400ms 100ms'
		}}/>
	);
}

export default Cursorlight;
