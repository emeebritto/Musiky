import { ClickEvent, Styles } from "common/types";
import Styled from 'styled-components';
import { istatic } from "services";
import React from 'react';


interface IconStyles extends Styles {
	hover?:Styles;
}


const Label = Styled.p<{pos?:string}>`
	position: absolute;
	display: none;
	padding: 3px 10px;
	white-space: nowrap;
	background-color: #000;
	border-radius: 15px;
	${({ pos="" }) => {
		let positions = pos.split(/\s/g);
		return `
			top: ${positions[0] || "0"};
			left: ${positions[1] || "0"};
		`;
	}}
`

const Button = Styled.button<IconStyles>`
	position: relative;
	--color-default: ${({ spec }) => spec? "yellow" : "transparent"};
	display: ${({ show }) => show === false? "none":"flex"};
	justify-content: center;
	align-items: center;
	border: none;
	border-right: ${({ border_right }) => border_right || ""};
	border-left: ${({ border_left }) => border_left || ""};
	background-color: ${({ background_color }) => background_color || "var(--color-default)"};
	padding: ${({ padding }) => padding || "0"};
	margin: ${({ margin }) => margin || "0"};
	cursor: pointer;

	:hover #label {
		display: inline-block;
	}
`

const Wrapper = Styled.section<IconStyles>`
	position: relative;
	--color-default: ${({ spec }) => spec? "green" : "transparent"};
	background-color: ${({ background_color }) => background_color || "var(--color-default)"};
	padding: ${({ padding }) => padding || "0"};
	margin: ${({ margin }) => margin || "0"};

	:hover #label {
		display: inline-block;
	}
`

const Img = Styled.img<IconStyles>`
	width: ${({ width }) => width || ""};
	height: ${({ height }) => height || ""};
	background-color: ${({ spec }) => spec? "red" : ""};
	transition: 200ms;

	:hover {
		${({ hover }) => (`
			transform: ${hover?.transform || ""};
		`)};
	}
`

interface ComponentProps {
	clickable?:boolean;
	show?:boolean;
	path?:string;
	iconCfg?: {
		fill?:number;
		wght?:number;
		opsz?:number;
		type?:string;
	};
	name?:string;
	label?:string;
	labelPosition?:string;
	alt:string;
	onClick?:(s:ClickEvent) => void;
	styles?:IconStyles;
}

interface IconWrapperProps {
	clickable?:boolean;
	show?:boolean;
	children:React.ReactNode;
	onClick?:(s:ClickEvent) => void;
	styles?:IconStyles;
}

const Icon:React.FC<ComponentProps> = ({ name="", alt, ...props }) => {
	const { clickable, show, label, labelPosition } = props;
	const { path, iconCfg } = props;
	const { styles } = props;
	const { onClick } = props;

	return (
		<IconWrapper
			show={show}
			clickable={clickable}
			onClick={onClick}
			styles={styles}
		>
			{!!label && <Label pos={labelPosition} id={`label`}>{label}</Label>}
			<Img
				src={path || istatic.getIconUrl({ name, iconCfg })}
				alt={alt}
				{...styles}
			/>
		</IconWrapper>
	);
}


function IconWrapper({ styles, children, onClick, ...props }:IconWrapperProps) {
	const { show, clickable } = props;

	if (clickable) {
		return (
			<Button
				show={show}
				onClick={onClick}
				{...styles}
			>
				{ children }
			</Button>
		);
	}

	return (
		<Wrapper {...styles}>{ children }</Wrapper>
	);
}

export default Icon;

// auto_awesome_FILL1_wght400_GRAD0_opsz48.svg