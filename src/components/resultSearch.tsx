import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { withRouter, NextRouter } from 'next/router';
import axios from 'axios';
import Styled from 'styled-components';
import { ArtistDataProps } from 'common/types';

import { BaseUrl } from 'api';

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
	width: 40vw;
	margin-left: 80px;
`

const Hr = Styled.hr`
	margin: 30px 0;
	opacity: 20%;
`

interface WithRouterProps {
  router: NextRouter;
}

const ResultSearch: React.FC<WithRouterProps> = ({ router }) => {

	const [searchTop, setSearchTop] = useState<ArtistDataProps>({} as ArtistDataProps);
	const [artists, setArtists] = useState([]);
	const [musics, setMusics] = useState([]);

	const [requestId, setRequestId] = useState('');

    let q: string = String(router.query.q);


    useEffect(() => {

        async function getData() {
            let res = await axios.get(`${BaseUrl}/search/${q}`)
            	.then(r=>r.data)
            	.catch(err => console.error(err));

            if(res.noFound) return;

            setSearchTop(res.searchTop);
            setArtists(res.artists);

            res.musics.length = 5;

            setMusics(res.musics);
            setRequestId(res.requestId);
        }
        getData()

    },[q])


	return (
		<>
		{requestId &&
			<ViewPort>
				<Label>Resultado para: {searchTop.name}</Label>
				<FirstSection>
					<ArtistCard artist={searchTop}/>
					<MusicListWrapper>
						<MusicList list={musics} listId={requestId}/>
					</MusicListWrapper>
				</FirstSection>
				<Hr/>
			</ViewPort>
		}
		{!requestId && <p>{q} - no Found (404)</p>}
		</>
	);
}

export default withRouter(ResultSearch);
