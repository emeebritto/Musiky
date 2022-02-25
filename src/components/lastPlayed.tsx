import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import axios from 'axios';
import { istatic } from 'api/istatic';
import { IstaticBaseUrl } from 'api';
import { useAccountContext } from 'common/contexts/Account';
import { usePlayerContext } from 'common/contexts/Player';

const ViewPort = Styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  cursor: pointer;
`
const Thumbnail = Styled.img`
  width: 125px;
  height: 100%;
`
const Data = Styled.section`
  text-align: center;
`
const Title = Styled.p`
  width: 420px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`
const From = Styled.p`
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
`
const Icon = Styled.img`
  filter: invert(100%);
  width: 30px;
  margin: 0 20px;
`

const Warns = Styled.p`
  margin: 0 auto;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

const LastPlayer = () => {
  const { history } = useAccountContext();
  const { prop } = usePlayerContext();
  const [last, setLast] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    let lastSong = prop.music? (history[1] || history[0]) : history[0];
    if (!lastSong) return;
    setLoading(true);
    async function getData() {
      let musicData = await axios.get(`${IstaticBaseUrl}music/${lastSong.id}`)
        .then(r => r.data)
        .catch(err => setError(true))
      let playlistData = await axios.get(`${location.origin}/api/playlist/${lastSong.playlist.id}`)
        .then(r => r.data)
      setLoading(false);
      if (musicData && musicData.id) {
        musicData['from'] = playlistData;
        setLast(musicData);
      }
    };
    getData();
  },[history])

  if (!last.id && loading) {
    return (
      <ViewPort>
        <Warns>Loading history..</Warns>
      </ViewPort>
    )
  } else if (!last.id && error) {
    return (
      <ViewPort>
        <Warns>request history failed.</Warns>
      </ViewPort>
    )
  } else if (!last.id) {
    return (
      <ViewPort>
        <Warns>You don't have history, yet.</Warns>
      </ViewPort>
    );
  } else if (!last.id) {
    return (<></>);
  }

	return (
    <ViewPort>
      <Thumbnail src={last.thumbnails[1].url} alt='music Thumbnail'/>
      <Data>
        <Title>{last.title}</Title>
        {!!last.from && <From>From Playlist: {last.from.infors.title}</From>}
        {!last.from && <From>{last.artists[0]}</From>}
      </Data>
      <Icon src={istatic.iconPlay()} alt='play'/>
    </ViewPort>
	);
}

export default LastPlayer;
