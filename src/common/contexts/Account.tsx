import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { DataStorage } from 'common/storage';
import { Music, DataHistory, PlaylistProps } from 'common/types';
import { AccountContext } from './providers/Account-provider';

const HISTORY_KEY = '2jdf3i23ef-history-temp';

export function useAccountContext(){

	const {
    auth,
    setAuth,
    displayName,
    setDisplayName,
    profileImg,
    setProfileImg,
    history,
    setHistory
	} = useContext(AccountContext);
	

// ==================================================================

  let router = useRouter();

  const updateHistory = ({
    type,
    data,
    playlistId
  }:{
    type: string,
    data: Music | PlaylistProps,
    playlistId?: string
  }): void => {
    
    if (DataStorage.get(HISTORY_KEY) == undefined) DataStorage.set(HISTORY_KEY, []);
    let date = new Date();
    if (type === 'music') {
      let newData: DataHistory = {
        id: data.id,
        type: 'music',
        time: date.getTime(),
        playlist: {
          id: playlistId,
          link: `/playlist/${playlistId}`
        }
      };
      let historyUpdated = [newData, ...history];
      setHistory(historyUpdated);
      DataStorage.set(HISTORY_KEY, [newData, ...DataStorage.get(HISTORY_KEY)]);
      return;
    };
    if (type === 'playlist') {
      let newData: DataHistory = {
        id: data.id,
        type: 'playlist',
        time: date.getTime()
      };
      let historyUpdated = [newData, ...history];
      setHistory(historyUpdated);
      DataStorage.set(HISTORY_KEY, [newData, ...DataStorage.get(HISTORY_KEY)]);
      return;
    }
  }

  const hasAccount = (): boolean => {
    return DataStorage.hasToken();
  }

  useEffect(() => {
    if(!auth) {
      setAuth(DataStorage.getToken());
    } else {
      let payload: any = jwt.decode(auth);
      setDisplayName(payload.userNameINF);
    }
  },[auth]);

  useEffect(() => {
    if(!router.query['pass']) return
    let pass = router.query['pass'];

    async function getData() {
      let res = await axios.get(`http://localhost:1234/msk/account/accessFastToken?passToken=${pass}`);
      DataStorage.setToken(res.data['ACCESS_TOKEN']);
      setAuth(res.data['ACCESS_TOKEN']);
    }
    getData();
  },[router.query]);

  useEffect(()=>{
    setHistory(DataStorage.get(HISTORY_KEY) || []);
  },[]);


  return {
    props: {
      displayName
    },
    history,
    hasAccount,
    updateHistory
  }
}
