import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { istatic, musikyApi } from 'services';
import { Music, DataHistory } from 'common/types';
import { useAccountContext } from 'contexts/Account';
import { usePlayer } from 'contexts/player';

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
  width: 420px;
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

interface FromProps {
  infors: {
    title: string
  };
}

const LastPlayer: React.FC = () => {
  const { history } = useAccountContext();
  const { prop, load } = usePlayer();
  const [last, setLast] = useState<Music | null>(null);
  const [from, setFrom] = useState<FromProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const playLastSong = (): void => {
    if (!last) return;
    load({ media: last });
  };

  useEffect(()=>{
    const lastSong:DataHistory = prop.music? (history[1] || history[0]) : history[0];
    if (!lastSong) return;
    setLoading(true);
    async function getData() {
      await istatic.musicsData({ id: lastSong.id })
        .then(r => setLast(r.data[0]))
        .catch(err => setError(true))

      if (lastSong.playlist?.id) {
        await musikyApi.playlist({ id: lastSong.playlist.id })
          .then(r => setFrom(r.data));
      }
      setLoading(false);
    };
    getData();
  },[history])

  if (!last && loading) {
    return (
      <ViewPort>
        <Warns>Loading history..</Warns>
      </ViewPort>
    )
  } else if (!last && error) {
    return (
      <ViewPort>
        <Warns>request history failed.</Warns>
      </ViewPort>
    )
  } else if (!last) {
    return (
      <ViewPort>
        <Warns>You don't have history, yet.</Warns>
      </ViewPort>
    );
  } else if (!last) {
    return (<></>);
  }

	return (
    <ViewPort onClick={playLastSong}>
      <Thumbnail src={istatic.baseUrl + last.thumbnails[1].url} alt='music Thumbnail'/>
      <Data>
        <Title>{last.title}</Title>
        {!!from && <From>From Playlist: {from.infors.title}</From>}
        {!from && <From>{last.artists[0].name}</From>}
      </Data>
      <Icon
        src={istatic.iconUrl({ name: "play_arrow", color: "black" })}
        alt='play'
      />
    </ViewPort>
	);
}

export default LastPlayer;
