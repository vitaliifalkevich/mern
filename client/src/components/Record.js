import React, {useEffect, useState, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import axios from "axios";
import './record.scss';
import Alert from "./Alert";


const Record = () => {
    const [employee, setEmployee] = useState(0);
    const [isRedirect, setRedirect] = useState(false);
    const [inputErrors, setErrors] = useState(0);

    const firstName = useRef('');
    const lastName = useRef('');
    const middleName = useRef('');
    const sex = useRef('');
    const phone = useRef('');
    const salary = useRef('');
    const position = useRef('');

    let location = useLocation();
    location = (location.hash).slice(1);


    useEffect(() => {
        if (!employee) {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            console.log('Component was render');
            try {
                if (location) {
                    const res = axios.get('/api/employees/' + location, config).then((res) => {
                        setEmployee(res.data);
                    });
                }

            } catch (err) {
                console.error(err.response.data);
                setErrors(err.response.data.errors);

            }
        }

    });

    const onSubmit = async (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let formData = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            middleName: middleName.current.value,
            sex: sex.current.value,
            phone: phone.current.value,
            salary: salary.current.value,
            position: position.current.value
        };
        const body = JSON.stringify(formData);
        console.log(body);
        try {
            if (!location) {
                const res = await axios.post('/api/employees/', body, config);
                console.log("bellow new user data");
                console.log(res.data);
                setEmployee(res.data.newEmployee);
                setRedirect(true);
            } else {
                const res = await axios.put('/api/employees/' + employee._id, body, config);
                console.log("bellow edit user data");
                console.log(res.data);
                setEmployee(res.data);
                setRedirect(true);

            }
            setErrors('success');
        } catch (err) {
            console.error(err.response.data);
            setErrors(err.response.data.errors);
        }

        console.log('submit');
        console.log(employee);
    };


    if (isRedirect === true) {
        return (<Redirect to='/'/>);
    } else {
        return (

            <div className="content form">
                {location ? <h2>Edit employee</h2> : <h2>Add a new employee here</h2>}
                <form action="" onSubmit={event => onSubmit(event)}>
                    <div className="input_group">
                        <label>
                            <input name="firstName" type="text"
                                   placeholder="First Name" ref={firstName} defaultValue={employee.firstName}/>
                        </label>
                        <div style={{width: '10px'}}></div>
                        <label>
                            <input name='lastName' type="text"
                                   placeholder="Last name" ref={lastName} defaultValue={employee.lastName}/>
                        </label>
                        <div style={{width: '10px'}}></div>
                        <label>
                            <input name='middleName' type="text"
                                   placeholder="Middle name" ref={middleName} defaultValue={employee.middleName}/>
                        </label>
                        <div style={{width: '10px'}}></div>
                        <label>
                            <input name='sex' type="text"
                                   placeholder="Sex" ref={sex} defaultValue={employee.sex}/>
                        </label>
                        <div style={{width: '10px'}}></div>
                        <label>
                            <input name='phone' type="text"
                                   placeholder="Phone" ref={phone} defaultValue={employee.phone}/>
                        </label>
                        <div style={{width: '10px'}}></div>
                        <label>
                            <input name='salary' type="text"
                                   placeholder="Salary" ref={salary} defaultValue={employee.salary}/>
                        </label>
                        <div style={{width: '10px'}}></div>
                        <label>
                            <input name='position' type="text"
                                   placeholder="Position" ref={position} defaultValue={employee.position}/>
                        </label>
                    </div>
                    <div className="btn-groups">
                        <input type="submit" value="Submit"/>
                        <input type="reset" value="Reset"/>
                        <Link className="goBack" to="/">Go Back</Link>
                    </div>
                </form>
                {inputErrors && inputErrors !=='success' ?  <Alert type="notice" msg={inputErrors}/> : ''}
                {inputErrors && inputErrors ==='success' ?  <Alert type="success" msg={inputErrors}/> : ''}
            </div>

        )

    }

};

export default Record;