import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './auth.scss';
import '../input.scss';
import Alert from "../Alert";

const Login = (props)=> {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [inputErrors, setErrors] = useState(0);
    const [cookies, setCookie] = useCookies(['loginHash']);
    const onSubmit = async e=> {
        e.preventDefault();

        const newUser = {
            email,
            password
        };
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(newUser);
            const res = await axios.post('/api/auth', body, config);
            if(res.data) {
                setCookie('loginHash', res.data.token, { path: '/' });
                console.log(cookies.loginHash);
            }
            console.log(res.data);

        } catch (err) {
            setErrors(err.response.data.errors);
            console.error(err.response.data.errors);
        }
    };
    const {email,password} = formData;
    const onChange = e=> {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (<Fragment>
            <div className='auth'>
                <h2>Sign In here</h2>
                <form onSubmit={e=>onSubmit(e)}>
                    <div className="input_group">
                        <label>
                            Email
                            <input
                                id="email"
                                name="email"
                                onChange={e=>onChange(e)}
                                value={email}
                                type="text"
                                placeholder="type your email here" />
                        </label>
                        <div style={{width: '10px'}}></div>
                        <label>
                            Password
                            <input
                                id="password"
                                name="password"
                                onChange={e=>onChange(e)}
                                value={password}
                                type="password"
                                placeholder="*************"/>
                        </label>
                        <div className="btn-groups">
                            <input type="submit" value="Sign In"/>
                            <input type="reset" value="Reset"/>
                        </div>
                    </div>
                    <br/>
                </form>
                {inputErrors ?  <Alert type="notice" msg={inputErrors}/> : ''}
            </div>
        </Fragment>
    )
};

export default Login;