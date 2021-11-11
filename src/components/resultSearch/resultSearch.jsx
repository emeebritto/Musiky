import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { msk_get } from 'api';

import { ArtistCard, MusicList } from 'components';

const ViewPort = Styled.section`
	margin: 30px 0;
`

const Label = Styled.h1`
	font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	margin: 0 0 40px 0;
	font-size: 1.2em;
	color: #fff;
`

const FirstSection = Styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
`

const MusicListWrapper = Styled.section`
	width: 50vw;
	margin-left: 80px;
`

const Hr = Styled.hr`
	margin: 30px 0;
	opacity: 20%;
`

const ResultSearch = () => {

	const [searchTop, setSearchTop] = useState({});
	const [artists, setArtists] = useState([]);
	const [musics, setMusics] = useState([]);

	const [requestId, setRequestId] = useState('');

	const { input } = useParams();


    useEffect(() => {

        async function getData() {
            let res = await msk_get('search', { input });

            console.log(res);

            setSearchTop(res.searchTop);
            setArtists(res.artists);

            res.musics.length = 5;

            setMusics(res.musics);
            setRequestId(res.requestId);
        }
        getData()

    },[input])


	return (
		<>
		{requestId &&
			<ViewPort>
				<Label>Resultado para: {input.replace(/-/g, ' ')}</Label>
				<FirstSection>
					<ArtistCard artist={searchTop}/>
					<MusicListWrapper>
						<MusicList list={musics} listId={requestId}/>
					</MusicListWrapper>
				</FirstSection>
				<Hr/>
			</ViewPort>
		}
		</>
	);
}

export default ResultSearch;
