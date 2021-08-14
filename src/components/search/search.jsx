import React, {useState, useEffect} from 'react'

import Styled from "styled-components";
import search_Icon from '../../assets/icons/search_white_24dp.svg'

import {getSuggestionArtists} from "../../api";
import {completeInput} from "../../api";

const ViewPort = Styled.section`
    display: flex;
    align-items: center;
	margin: 0px 0px 60px 0px;
`
const SearchBar = Styled.section`
	display: flex;
	position: relative;
	align-items: center;
	width: 500px;
	height: 40px;
`
const InputSearchBar = Styled.input`
    background-color: transparent;
    padding: 0px 11px 0px 11px;
    outline: none;
    color: white;
	border: none;
	width: 87%;
	height: 95%;
	border-radius: 6px 0px 0px 0px;
	border-bottom: 2px solid white;
	font-size: 1.2em;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

	::-webkit-input-placeholder {
	   color: #A9A9A9;
	}

	:-moz-placeholder { /* Firefox 18- */
	   color: #A9A9A9;  
	}

	::-moz-placeholder {  /* Firefox 19+ */
	   color: #A9A9A9;  
	}

	:-ms-input-placeholder {  
	   color: #A9A9A9;  
	}
`
const BtnSearch = Styled.button`
    background-color: white;
    width: 13%;
	border: none;
    height: 100%;
    border-radius: 0px 6px 6px 0px;
    transition: 500ms;

    :hover {
    	cursor: pointer;
    	background-color: #C9C9C9;
    }
`
const SearchIcon = Styled.img`
	filter invert(100%);
`
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
`

const Option = Styled.p`
	width: 98%;
	cursor: pointer;
	padding: 4px 10px 4px 10px;
	overflow: hidden;
	white-space: nowrap;
    text-overflow: ellipsis;

	:hover {
		background-color: #0D0A0A;
	}
`

const Suggestions = Styled.section`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width: 60%;
	justify-content: space-around;
	margin-left: 20px;
`
const SuggestionBox = Styled.section`
	background-color: #1E1E1E;
	border-radius: 10px;
	margin: 2px 4px;
	transition: 500ms;

	:hover {
		cursor: pointer;
		background-color: #111111;
	}
`
const Suggestion = Styled.p`
	color: white;
	padding: 3px 10px;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

const Search = () => {

	const [inputSearch, setInputSearch] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [autoComplete, setAutoComplete] = useState([])


    const filterSearch = async (value) => {
    	var selected = []

	    if (value.length > 1) {
	    	setAutoComplete(await completeInput(value))
	    } else {
	    	setAutoComplete([])
	    }
    }

	useEffect(() => {
		async function getData(){
			setSuggestions(await getSuggestionArtists(11))			
		}
		getData()

	},[])

	function OptionsAutoComplete(){
		return(
			<OptionsCompleteSearch>
				{autoComplete.map((option, index) =>{
					return(
						<Option>{option}</Option>
					)
				})}
			</OptionsCompleteSearch>
		)
	}

	return(
		<ViewPort>
			<SearchBar>
				<InputSearchBar 
					type="text" 
					name="seach" 
					value={inputSearch} 
					onInput={e => {
						setInputSearch(e.target.value)
						filterSearch(e.target.value)
					}} 
					placeholder="Artists & Songs"
					/>
				<BtnSearch>
					<SearchIcon src={search_Icon} alt="search icon"/>
				</BtnSearch>
				{autoComplete.length && <OptionsAutoComplete/>}
			</SearchBar>
			<Suggestions>
				{suggestions.map((suggestion, index) => {
                    return (
                        <SuggestionBox key={index}>
                        	<Suggestion>{suggestion}</Suggestion>
                        </SuggestionBox>
                    )
                })}
			</Suggestions>
		</ViewPort>
	)
}

export default Search