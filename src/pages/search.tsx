import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchPageContent } from 'common/types/pagesSources';
import { Music } from 'common/types';
import axios from 'axios';
import Styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import { useSplashContext } from 'common/contexts/splash';
import Istatic from "services/istatic";
import autoComplete from 'common/utils/search/autoComplete';
import { 
  PlaylistsRow, 
  ArtistsRow, 
  SearchAutoComplete,
  ResultSearch
} from 'components';


const ViewPort = Styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  perspective: 1px;
  transform-style: preserve-3d;
  width: 96.4vw;
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
    top: -9vh;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    background: url(${Istatic.imgUrl({ path: "background/classicDisc_darkfilter.png" })}) center;
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
  background: #020309;
  line-height: 22px;
  box-shadow: 0px 0px 30px rgb(0 0 0 / 80%);
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
const Suggestion = Styled.p`
  color: #fff;
  padding: 3px 10px;
  margin: 2px 4px;
  background-color: #1E1E1E;
  border-radius: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  transition: 500ms;

  :hover {
    cursor: pointer;
    background-color: #111111;
  }
`

interface SearchPageProp {
    pageContent: SearchPageContent;
}

const Search: NextPage<SearchPageProp> = ({ pageContent }) => {

  const { desableSplash } = useSplashContext();

  const [inputSearch, setInputSearch] = useState('');
  const [optionsToComplete, setOptionsToComplete] = useState<string[]>([]);
  const [inputValueDebounce] = useDebounce(inputSearch, 900);
  const router = useRouter();
  let { q } = router.query;

  const updateField = (option: string): void => {
    setInputSearch(option);
    setOptionsToComplete([]);
  }
  const filterSearch = async (value: string): Promise<void> => {
    if (value.length > 1) {
      setOptionsToComplete(await autoComplete({input: value, maxResult: 8}));
    } else {
      setOptionsToComplete([]);
      router.push('/search');
    }
  }

  useEffect(() => {
  // The q changed!
  }, [router.query.q])

  useEffect(() => {
    filterSearch(inputValueDebounce);
  }, [inputValueDebounce])

  if(pageContent) desableSplash();
  

  return (
    <>
    <Head>
      <title>Musiky - Search</title>
    </Head>
    <ViewPort>
      <ContentField>
        {router.query.q && <ResultSearch />}
        <PlaylistsRow
          name='Others lists'
          data={pageContent.playlists.othersLists}
        />
        <ArtistsRow data={pageContent.artists}/>
      </ContentField>
      <SearchField onClick={() => setOptionsToComplete([])}>
          <SearchBar>
            <InputSearchBar 
                type="text" 
                name="seach" 
                value={inputSearch} 
                onInput={e => {
                    let target = e.target as HTMLInputElement;
                    setInputSearch(target.value);
                }} 
                placeholder="Artists & Songs"
            />
            <BtnSearch onClick={e=> {
              setOptionsToComplete([]);
              router.push(
                `${router.route}/?q=${inputSearch.replace(/\W|_/gi, '')}`,
                undefined,
                { shallow: true }
              )
            }}>
              <SearchIcon src={Istatic.iconUrl({ name: "search" })} alt="search icon"/>
            </BtnSearch>

            {!!optionsToComplete.length
              && <SearchAutoComplete
                    autoComplete={optionsToComplete} 
                    updateField={updateField}/>}
          </SearchBar>
          <Suggestions>
            {pageContent.searchSuggestions.map((suggestion, index) => (
              <Link
                href={`${router.route}?q=${suggestion.replace(/\W|_/gi, '')}`}
                key={index}>
                <Suggestion onClick={()=>{updateField(suggestion)}}>
                  {suggestion}
                </Suggestion>
              </Link>
            ))}
          </Suggestions>
      </SearchField>
    </ViewPort>
    </>
  )
}

export default Search;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const URL = `http://${context.req.headers.host}/api/pages/search`;
  const pageContent = await axios.get(URL).then(r => r.data);
  return {
    props: { pageContent }, // will be passed to the page component as props
  }
}
