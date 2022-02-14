import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';

const ViewPort = Styled.section`
	position: relative;
	display: flex;
	justify-content: space-around;
	align-items: center;
	min-height: 45px;
	z-index: 1;
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 8px;
	background-color: rgba(0, 0, 0, 0.3);
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	margin: ${(props: {margin: string}) => (props.margin)};
`
const Text = Styled.p`
`
const Action = Styled.button`
	cursor: pointer;
	border: none;
	color: #4AB2FF;
	font-weight: bold;
	background-color: transparent;
`

interface WarnBoxProps {
	activeIf: boolean;
	txt: string;
	action: {
		name: string;
		execute: () => void;
	};
	margin?: string;
};

const WarnBox: React.FC<WarnBoxProps> = ({ activeIf, txt, action, margin='0' }) => (
	<>
	{activeIf &&
	<ViewPort margin={margin}>
		<Text>{ txt }</Text>
		<Action onClick={action.execute}>{action.name.toLocaleUpperCase()}</Action>
	</ViewPort>}
	</>
);

export default WarnBox;
