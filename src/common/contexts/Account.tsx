import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { DataStorage } from 'common/storage';
import { AccountContext } from './providers/Account-provider';


declare module 'jsonwebtoken' {
    export interface UserTokenProps extends jwt.JwtPayload {
        userNameINF: string;
    }
}

export function useAccountContext(){

	const {
        auth,
        setAuth,
        displayName,
        setDisplayName,
        profileImg,
        setProfileImg
	} = useContext(AccountContext);
	

// ==================================================================

    let router = useRouter();

    const hasAccount = (): boolean => {
        return DataStorage.hasToken();
    }

    useEffect(() => {
        if(!auth) {
            setAuth(DataStorage.getToken());
        } else {
            let payload: jwt.UserTokenProps | null = jwt.decode(auth);
            setDisplayName(payload?.userNameINF);
        }
    },[auth])

    useEffect(() => {
        if(!router.query['pass']) return
        let pass = router.query['pass'];

        async function getData() {
            let res = await axios.get(`http://localhost:1234/msk/account/accessFastToken?passToken=${pass}`);
            DataStorage.setToken(res.data['ACCESS_TOKEN']);
            setAuth(res.data['ACCESS_TOKEN']);
        }

        getData();

    },[router.query])


    return {
        props: {
            displayName
        },
        hasAccount
    }
}