import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { player, scroll } from './controllers'

import {
	Splashscreen,
	TransitionLoadingBar,
	Header,
	Home,
	Explore,
	PlayList,
	ArtistsList,
	PlayerControl,
	ReactPlayerComp,
	NotFound404
} from './components'

import { GlobalStyle } from './components/GlobalStyle'
import Styled from 'styled-components'


const Background = Styled.section`
    position: fixed;
`
const Blur = Styled.div`
`
const ViewPort = Styled.section` 
    background-color: rgb(0 0 0 /95%);
    overflow: scroll;
    width: 100vw;
    height: 100vh;
    ::-webkit-scrollbar {
	    height: 0px;
	}
`
const Centralize = Styled.section`
	display: flex;
    justify-content: center; 
`


const App = () => {

	const [background, setBackground] = useState('')
	const [viewPortRef, setViewPortRef] = useState(null)
	const [appLoading, setAppLoading] = useState(true) // Splash
	const [pagLoading, setPagLoading] = useState({loadingBar: false, contentLoaded: false}) //Loading Bar

	const loadingStates = {
		appLoading: status => setAppLoading(status),
		pagLoading: status => setPagLoading(status),
		values: pagLoading
	}

	const updateBackground = (targetIndex, targetList) => {
		setBackground(targetList[targetIndex].snippet.thumbnails.medium.url)
	}

    useEffect(()=>{
        player.setBackgroundFunction(updateBackground)
    },[])


    const ref = viewScroll => {
    	scroll.setViewRef(viewScroll)
    }

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
								<Route exact path={"/"}>
									<Home loadingStates={loadingStates}/>
								</Route>
								<Route path={"/explore/"}>
									<Explore loadingStates={loadingStates}/>
								</Route>
								<Route path={"/library/"}>
									<Explore/>
								</Route>
					            <Route path={`/playList/:id`}>
	                                <PlayList loadingStates={loadingStates}/>
	                            </Route>
					            <Route path={`/artists/`}>
	                                <ArtistsList/>
	                            </Route>
	                            <Route>
	                            	<NotFound404 loadingStates={loadingStates}/>
	                            </Route>
							</Switch>
						</Centralize>

						<PlayerControl/>
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