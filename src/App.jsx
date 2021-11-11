import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';

import Routes from './router';
import { GlobalStyle } from './components/GlobalStyle';
import { player, scroll } from './controllers';


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
    	width: 0;
      height: 0;
  	}

  @media(max-width: 500px) {
    ::-webkit-scrollbar {
      width: 0;
    }
  }
`

const App = () => {

	const [background, setBackground] = useState('');

	const updateBackground = (indexOnPlaylist, musicList) => {
		setBackground(musicList[indexOnPlaylist].snippet.thumbnails.medium.url);
	}

    useEffect(()=>{
        player.setBackgroundObserver(updateBackground);

    },[])


	const ref = viewScroll => {
		scroll.setViewRef(viewScroll)
	}


	return (
		<Background style={{ background: `url(${background}) no-repeat center/100%`}}>
			<Blur>
				<GlobalStyle/>
				<ViewPort ref={viewScroll => ref(viewScroll)}>
					<Routes/>
				</ViewPort>
			</Blur>
		</Background>
	);
}

export default App;

/*

    backdrop-filter: blur(7px);
    -webkitBackdrop-filter: blur(7px);

*/