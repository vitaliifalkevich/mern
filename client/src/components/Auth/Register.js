import React, {Fragment, useState} from 'react';
import axios from 'axios';
import './auth.scss';
import '../input.scss';
import Alert from "../Alert";

const Register = ()=> {
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: ''
    });
    const [inputErrors, setErrors] = useState(0);

    const onSubmit = async e=> {
      e.preventDefault();

      const newUser = {
          login,
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
          const res = await axios.post('/api/signup', body, config);
          console.log(res.data);
          setErrors('success');
      } catch (err) {
          console.error(err.response.data);
          setErrors(err.response.data.errors);
      }
    };
    const {login, email, password} = formData;
    const onChange = e=> {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (<Fragment>
        <div className='auth'>
            <h2>Sign up here</h2>
            <form onSubmit={e=>onSubmit(e)}>
                <div className="input_group">
                    <label>
                        Login
                        <input
                            id="login"
                            name="login"
                            onChange={e=>onChange(e)}
                            value={login}
                            type="text"
                            placeholder="type your login here" />
                    </label>
                    <div style={{width: '10px'}}></div>
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
                        <input type="submit" value="Sign Up"/>
                        <input type="reset" value="Reset"/>
                    </div>
                </div>
                <br/>
            </form>
            {inputErrors && inputErrors !=='success' ?  <Alert type="notice" msg={inputErrors}/> : ''}
            {inputErrors && inputErrors ==='success' ?  <Alert type="success" msg={inputErrors}/> : ''}
        </div>
    </Fragment>
    )
};

export default Register;