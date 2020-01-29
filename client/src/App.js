import React, {Fragment, useEffect, useState} from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'
import Main from './components/Main';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import { useCookies } from 'react-cookie';
import axios from "axios";
import Record from "./components/Record";


const App = () => {
    const [cookies, setCookie] = useCookies(['loginHash']);
    const [checkHASH, setCheckHASH] = useState(false);
    const [userName, setUserName] = useState('');

    const updateParentWhenLogOut = (checkHASH)=>{
        setCheckHASH(false);
    };

    useEffect(() => {
        try {
            if(!checkHASH) {
                const config = {
                    headers: {
                        'x-auth-token': cookies.loginHash
                    }
                };
                const res = axios.get('/api/auth', config).then((res)=>{
                    setCheckHASH(true);
                    console.log(res.data);
                });
            }

        } catch (err) {
            console.error(err.response.data);
        }
    });
    return(
        <Fragment>
            <Router>
                <header id="header">
                    <div className="container">
                        <div className="logo">
                            <h1>Employee management system</h1>
                        </div>
                        <ul>
                            {checkHASH === true ? <li className="userName">Welcome to dashboard <Logout onLogOut={updateParentWhenLogOut}/></li>
                                :
                                <><li><Link to="/auth">Login</Link></li><li><Link to="/register">Register</Link></li></>}

                        </ul>
                    </div>
                </header>
                <Switch>
                    <Route exact path="/">
                        <Main checkHASH={checkHASH}/>
                    </Route>
                    <Route
                        path="/auth"
                        render={() =>
                            checkHASH ? (
                                <Main checkHASH={checkHASH}/>
                            ) : (
                                <><Redirect
                                    to={{
                                        pathname: "/",
                                    }}/>
                                    <Login/></>
                            )
                        }
                    >
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/employees/">
                        {checkHASH ? <Record/> : <Login/> }
                    </Route>
                </Switch>
            </Router>
        </Fragment>
    )
};



export default App;
