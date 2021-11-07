import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';

import { ArtistCard, MusicList } from 'components';

const ViewPort = Styled.section`
	width: 80%;
	height: 500px;
	background-color: red;
`

const FirstSection = Styled.section`
	background-color: green;
	display: flex;
	justify-content: space-around;
`

const ResultSearch = () => {

	const artistTest = {
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F3d%2Ff7%2F04%2F3df70452f84bbf7da54212ade74f9433.jpg&f=1&nofb=1',
        name: 'none'
    }

	return (
		<ViewPort>
			<FirstSection>
				<ArtistCard artist={artistTest}/>
				<MusicList/>				
			</FirstSection>
		</ViewPort>
	);
}

export default ResultSearch;
