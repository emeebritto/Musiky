import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { player, scroll } from './controllers'

import {
	TransitionLoadingBar,
	Header,
	PlayerControl,
	ReactPlayerComp,
	NavBar
} from './components'

import {
	Splashscreen,
	Home,
	Explore,
	PlayList,
	ArtistsList,
	NotFound404
} from './screens'

import { GlobalStyle } from './components/GlobalStyle'
import Styled from 'styled-components'


const Background = Styled.section`
    position: fixed;
`
const Blur = Styled.div`
`
const ViewPort = Styled.section` 
    position: relative;
    background-color: rgb(0 0 0 /95%);
    overflow: scroll;
    width: 100vw;
    height: 100vh;
    ::-webkit-scrollbar {
	    height: 0;
	}

    @media(max-width: 500px) {
	    ::-webkit-scrollbar {
		    width: 0;
		}
    }
`
const Centralize = Styled.section`
	display: flex;
    justify-content: center; 
`


const App = () => {

	const [background, setBackground] = useState('')
	const [appLoading, setAppLoading] = useState(true) // Splash
	const [pagLoading, setPagLoading] = useState({loadingBar: false, contentLoaded: false}) //Loading Bar

	const loadingStates = {
		appLoading: status => {
			setAppLoading(status)
		},
		pagLoading: status => {
			setPagLoading(status)
		},
		values: pagLoading
	}

	const updateBackground = (indexOnPlaylist, musicList) => {
		setBackground(musicList[indexOnPlaylist].snippet.thumbnails.medium.url)
	}

    useEffect(()=>{
        player.setBackgroundObserver(updateBackground)

    },[])


    const ref = viewScroll => {
    	scroll.setViewRef(viewScroll)
    }


    const sharedProps = {
    	loadingStates,
    }

	const routes = [
		{
			path: '/',
			exact: true,
			component: Home,
		},
		{
			path: '/explore',
			component: Explore,
		},
		{
			path: '/library',
			component: Explore,
		},
		{
			path: '/playlist/:id',
			component: PlayList,
		},
		{
			path: '/artists',
			component: ArtistsList,
		},
		{
			path: '*',
			component: NotFound404,
		},
	];

	return (
		<Router>
			<Background style={{ background: `url(${background}) no-repeat center/100%`}}>
				<Blur>
					<ViewPort ref={viewScroll => ref(viewScroll)}>

						{appLoading && <Splashscreen/>}
						{pagLoading.loadingBar && <TransitionLoadingBar loadingStates={loadingStates}/>}

						<GlobalStyle />
						<ReactPlayerComp/>

						<Header loadingStates={loadingStates}/>

						<Centralize>
						    <Switch>
								{routes.map(route => (
									<Route exact={route.exact} path={route.path}>
								    	<route.component {...sharedProps}/>
								    </Route>
								))}
        					</Switch>
						</Centralize>

						<PlayerControl/>

						<NavBar loadingStates={loadingStates}/>
					</ViewPort>
				</Blur>
			</Background>
		</Router>
	);
}

export default App;

/*

    backdrop-filter: blur(7px);
    -webkitBackdrop-filter: blur(7px);

*/