import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import nookies from 'nookies';
import dataStorage from 'common/storage';
import { Music, DataHistory, PlaylistProps } from 'common/types';
import { AccountContext } from './providers/Account-provider';

const HISTORY_KEY = '2jdf3i23ef-history-temp';

export function useAccountContext(){

	const {
    auth,
    setAuth,
    displayName,
    setDisplayName,
    userId,
    setUserId,
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
    playlistId: string | null
  }): void => {
    
    if (dataStorage.get(HISTORY_KEY) == undefined) dataStorage.set(HISTORY_KEY, []);
    let date = new Date();
    if (type === 'music') {
      let newData: DataHistory = {
        id: data.id,
        type: 'music',
        time: date.getTime(),
        playlist: {
          id: playlistId,
          link: playlistId ? `/playlist/${playlistId}` : null
        }
      };
      let historyUpdated = [newData, ...history];
      setHistory(historyUpdated);
      dataStorage.set(HISTORY_KEY, [newData, ...dataStorage.get(HISTORY_KEY)]);
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
      dataStorage.set(HISTORY_KEY, [newData, ...dataStorage.get(HISTORY_KEY)]);
      return;
    }
  }

  const hasAccount = (): boolean => {
    return !!auth;
  }

  useEffect(() => {
    if (!auth) {
      const cookies = nookies.get();
      return setAuth(cookies.itokenus);
    };
    let payload: any = jwt.decode(auth);
    if (!payload) return setAuth('');
    setDisplayName(payload.dName);
    setUserId(payload.uuidb);
  },[auth]);

  useEffect(() => {
    if(!router.query['pass']) return
    let pass = router.query['pass'];

    (async() => {
      let res = await axios.get(`http://localhost:7050/account/accessFastToken?passToken=${pass}`);
      nookies.set(undefined, 'itokenus', res.data['accessToken'], { path: '/' });
      setAuth(res.data['accessToken']);
    })()
  },[router.query]);

  useEffect(()=>{
    setHistory(dataStorage.get(HISTORY_KEY) || []);
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
