import React, { useState, useEffect } from 'react';
import { Link, useHistory, useRouteMatch, Route } from 'react-router-dom';
import Styled from 'styled-components';

import { msk_get } from 'api';

import { istatic } from "api/istatic";

import { 
	PlaylistsRow, 
	ArtistsRow, 
	SearchAutoComplete,
	ResultSearch
} from 'components';

import viewportBackground from 'assets/img/background-musiky-search.png';


const ViewPort = Styled.section`
	display: flex;
	flex-direction:column;
	align-items: center;
	justify-content: center;
    perspective: 1px;
    transform-style: preserve-3d;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;


    @media(max-width: 1000px) {
        flex-direction: column;
    }
`
const SearchField = Styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    min-height: 80vh;
    position: relative;
    transform-style: inherit;
	width: 96vw;
	background: 50% 50%;

	:before {
	    background: 50% 50%;
	}

	::before {
	    content: "";
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    display: block;
	    background: url(${viewportBackground}) center;
	    transform-origin: center center 0;
	    transform: translateZ(-1px) scale(2);
	    z-index: -1;
	    min-height: 80vh;
	}
`

const ContentField = Styled.section`
	z-index: 2;
    position: absolute;
    display: flex:
    justify-content: center;
    top: 80vh;
    padding: 0 10vw 14vh 10vw;
    background: black;
    line-height: 30px;
`

const SearchBar = Styled.section`
	display: flex;
	position: relative;
	align-items: center;
	width: 560px;
	height: 45px;
	margin-bottom: 40px;

    @media(max-width: 1000px) {
        width: 90%;
        margin-bottom: 25px;
    }

`
const InputSearchBar = Styled.input`
    background-color: transparent;
    padding: 0px 11px 0px 11px;
    outline: none;
    color: white;
	border: none;
	width: 87%;
	height: 91%;
	border-radius: 6px 0px 0px 0px;
	border-top: 2px solid #fff;
	border-left: 2px solid #fff;
	border-bottom: 2px solid #fff;
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
    background-color: transparent;
    width: 13%;
	border: 2px solid #fff;
    height: 99%;
    border-radius: 0px 6px 0px 0px;
    transition: 500ms;

    :hover {
    	cursor: pointer;
    }
`

const SearchIcon = Styled.img`
`

const Suggestions = Styled.section`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width: 60%;
	justify-content: space-around;
	margin-left: 20px;

    @media(max-width: 1000px) {
        width: 95%;
        margin-left: 0px;
    }
`
const SuggestionBox = Styled(Link)`
    text-decoration: none;
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


const Search = ({ loadingStates }) => {

	const [inputSearch, setInputSearch] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [autoComplete, setAutoComplete] = useState(null);

	let match = useRouteMatch();
	let history = useHistory();

    const updateField = option => {
    	setInputSearch(option)
    	setAutoComplete([])
    }

    const filterSearch = async (value) => {

	    if (value.length > 1) {
	    	setAutoComplete(await msk_get('inputAutoComplete', {input: value, maxResult: 10}))
	    } else {
	    	setAutoComplete([])
	    	history.push('/search')
	    }
    }

	useEffect(() => {
		async function getData(){
			setSuggestions(await msk_get('suggestionArtists', { maxResult: 11 }))

            if(loadingStates !== undefined){
                loadingStates.setSplash(false);
                loadingStates.setPageLoadingBar({loadingBar: true, contentLoaded: true});
            }
		}
		getData()

	},[])


	return(
		<ViewPort>
			<ContentField>
	            <Route path={`${match.path}/:input`}>
	                <ResultSearch/>
	            </Route>
				<PlaylistsRow 
					name='Others lists'
					loadingStates={loadingStates}/>
				<ArtistsRow maxResult={6}/>
			</ContentField>
			<SearchField>
				<SearchBar>
					<InputSearchBar 
						type="text" 
						name="seach" 
						value={inputSearch} 
						onInput={e => {
							setInputSearch(e.target.value)
							filterSearch(e.target.value)
						}} 
						placeholder="Artists & Songs"/>

					<BtnSearch onClick={e=> history.push(`${match.url}/${inputSearch.replaceAll(' ', '-')}`)}>
						<SearchIcon src={istatic.search_Icon()} alt="search icon"/>
					</BtnSearch>

					{autoComplete 
						&& <SearchAutoComplete 
								autoComplete={autoComplete} 
								updateField={updateField}/>}
					
				</SearchBar>
				<Suggestions>
					{suggestions.map((suggestion, index) => {
	                    return (
	                        <SuggestionBox 
	                        	onClick={()=>{updateField(suggestion)}}
	                        	to={`${match.url}/${suggestion.replaceAll(' ', '-')}`}
	                        	key={index}>
	                        	<Suggestion>{suggestion}</Suggestion>
	                        </SuggestionBox>
	                    )
	                })}
				</Suggestions>
			</SearchField>
		</ViewPort>
	)
}

export default Search