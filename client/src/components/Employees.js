import React, {useEffect, useState} from 'react';
import './employees.scss';
import Employee from './Employee'
import {Link} from 'react-router-dom'
import axios from "axios";

const Employees = () => {

    const [employees, setEmployees] = useState(0);
    const [componentWillUpdateNow, setComponentWillUpdateNow] = useState(false);

    const updateParentWhenDeleteEmployee = (employees) => {
        setEmployees(0);
    };


    useEffect(() => {
        try {
            if (!employees) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const res = axios.get('/api/employees', config).then((res) => {
                    setEmployees(res.data.employees);
                });
            }
        } catch (err) {
            console.error(err.response.data);

        }
    });


    const onSearch = (e) => {
        let searchedValue = e.target.value;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = axios.get('/api/search?search='+ searchedValue, config).then((res) => {
                setEmployees(res.data.employees);
            });
        } catch (err) {
            console.error(err.response.data);

        }

        console.log("View array bellow");

    };
    return (
        <>
            <div className="content">
                <div className="search">
                    <input
                        name="search"
                        onChange={e => onSearch(e)}
                        type="text"
                        placeholder="Search..."/>
                </div>
                <h2>List of Employees</h2>
                <table className="employees">
                    <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Sex</th>
                        <th>Phone</th>
                        <th>Salary</th>
                        <th>Position</th>
                        <th>Date of adding</th>
                        <th width="50">Edit</th>
                        <th width="50">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Employee employees={employees} onDeleteEmployee={updateParentWhenDeleteEmployee}/>
                    </tbody>
                </table>
                <Link className="addNewEmployee" to="/employees">+ Add a new Employer</Link>
            </div>

        </>
    );
};


export default Employees;
