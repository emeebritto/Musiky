import React from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Link from 'next/link';
import Styled from 'styled-components';


const OptionsCompleteSearch = Styled.section`
	position: absolute;
	z-index: 100;
	color: #fff;
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
const Option = Styled.a`
    display: inline-block;
    text-decoration: none;
    color: #fff;
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

interface AutoCompleteProps {
	autoComplete: Array<string>;
	updateField: (s: string) => void;
}

const SearchAutoComplete: React.FC<AutoCompleteProps> = ({
	autoComplete,
	updateField
}) => {

    const router = useRouter();

	return(
		<OptionsCompleteSearch>
			{autoComplete.map((option, index) => {
				return(
					<Link href={`${router.route}?q=${option.replace(/\W|_/gi, '')}`}>
						<Option onClick={(e) => {
							e.stopPropagation();
							updateField(option);
						}}>
							{option}
						</Option>
					</Link>
				)
			})}
		</OptionsCompleteSearch>
	)
}

export default SearchAutoComplete;
