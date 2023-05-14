import React, { useRef, useState, useEffect, useCallback } from "react";
import { ClickEvent } from "common/types";
import { useRouter } from "next/router";
import Styled from "styled-components";
import { Icon } from "components";


const VoidArea = Styled.div`
	position: fixed;
	z-index: 2;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0.5);
`

const Wrapper = Styled.section`
	position: relative;
	z-index: 2;
`

const SearchField = Styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 40rem;
	max-width: 92vw;
	border-radius: 20px;
	border: 1px solid #fff;
	transition: 300ms;

	:hover {
		background-color: #00091E;
	}
`

const SearchInput = Styled.input`
	background-color: transparent;
	outline: none;
	border: none;
	z-index: 1;
	width: 100%;
	overflow: scroll;
  resize: none;
	color: #fff;
	font-size: 1.1em;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	padding: 11px 0;
	margin: 3px 0;
	transition:	 400ms;
`

const ActionsWrapper = Styled.section<{ show?:boolean, margin?:string }>`
	display: ${({ show }) => show? "flex":"none"};
	align-items: center;
	margin: ${({ margin }) => margin || ""};
`

const LeftElements = Styled.section`
	display: flex;
	flex-direction: column;
	height: 100%;
`

const RightElements = Styled.section`
	display: flex;
	flex-direction: column;
	height: 100%;
`

const SearchBar:React.FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);


	const focusToInput = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
	  if (inputRef.current) {
	    inputRef.current.focus();
	  }
	};

	const updateRouteQuery = (query:string="") => {
	  const newQueryParams = { ...router.query, q: query };
	  router.push({ query: newQueryParams });
	};

	const clearRouteQuery = useCallback(() => {
	  router.push({ query: {}	});
	}, [router]);

	const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
   	if (e.key === 'Enter') {
      e.preventDefault();
      if (!inputValue.replace(/\W/g, "")) return;
      updateRouteQuery(inputValue);
    }
	};

	return (
		<>
		<Wrapper onClick={focusToInput} onKeyDown={handleKeyDown}>
			<SearchField id="search-input">
				<LeftElements>
					<Icon
						name="music_note"
						alt="music note"
						styles={{
							padding: "0 18px",
							width: "26px"
						}}
					/>
				</LeftElements>
				<SearchInput
					ref={inputRef}
					type="text"
					tabIndex={0}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="What should we play?"
				/>
				<RightElements>
					<Icon
						clickable
						onClick={() => alert("clicked")}
						name="play_arrow"
						alt="play song"
						styles={{
							padding: "5px 18px",
							width: "32px"
						}}
					/>
				</RightElements>
			</SearchField>
		</Wrapper>
		</>
	);
}

export default SearchBar;
