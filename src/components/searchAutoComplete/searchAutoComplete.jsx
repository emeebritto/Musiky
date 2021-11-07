import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import Styled from 'styled-components';

const OptionsCompleteSearch = Styled.section`
	position: absolute;
	z-index: 5;
	color: white;
	overflow: hidden;
	background-color: #000005;
	border: 1px solid #191D1F;
	border-radius: 10px;
	box-shadow: 1px 1px 30px black;
	top: 50px;
	width: 465px;
	height: auto;

    @media(max-width: 1000px) {
        width: 100%;
    }
`

const Option = Styled(Link)`
    display: inline-block;
    text-decoration: none;
    color: white;
	width: 98%;
	cursor: pointer;
	padding: 4px 10px 4px 10px;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	overflow: hidden;
	white-space: nowrap;
    text-overflow: ellipsis;

	:hover {
		background-color: #0D0A0A;
	}
`

const SearchAutoComplete = ({ autoComplete, updateField }) => {

	let { url } = useRouteMatch();

	return(
		<OptionsCompleteSearch>
			{autoComplete.map((option, index) =>{
				return(
					<Option 
						onClick={()=> updateField(option)} 
						to={`${url}/${option.replaceAll(' ', '-')}`}>
						{option}
					</Option>
				)
			})}
		</OptionsCompleteSearch>
	)
}

export default SearchAutoComplete;
