import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Logout = (props)=> {
    const [cookies, setCookie] = useCookies(['loginHash']);
    const [checkHASH, setCheckHASH] = useState(false);
    const [userName, setUserName] = useState('');

    const logOut = () => {
        setCookie('loginHash', '', { path: '/' });
        props.onLogOut('');
        console.log('Logout');
    };

    return(
        <a href="#" className="logout" onClick={logOut}>Logout</a>
    )
};

export default Logout;