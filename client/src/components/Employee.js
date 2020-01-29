import React from 'react';
import axios from 'axios';
import moment from 'moment';

const Employee = (props)=> {
    const dateConvert = (date)=> {
        let convertedDate = moment(Number(date)).format("MM/DD/YYYY");
        return ( convertedDate);
    };
    const updateParentWhenDeleteEmployee = () => {
        props.onDeleteEmployee(true);
    };

    const onDelete = (e)=> {
        let deleteId = e.target.id;
        console.log(deleteId);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = axios.delete('/api/employees/' + deleteId, config ).then((res) => {
                console.log(res.data);
                updateParentWhenDeleteEmployee();
            });

        } catch (err) {
            console.error(err.response.data);
        }

    };
    const showList = ()=>{

        if (props.employees.length > 0) {
            return props.employees.map((employee, idx) => {
                return (
                    <tr key={idx}>
                        {console.log(employee)}
                        <td>{employee.lastName} {employee.firstName} {employee.middleName}</td>
                        <td>{employee.sex}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.position}</td>
                        <td>{dateConvert(employee.timeStamp)}</td>
                        <td><a href={"/employees/#" + employee._id}>Edit</a></td>
                        <td><a id={employee._id} href="#" onClick={(e) => onDelete(e)}>Delete</a></td>
                        </tr>
                );
            });
        } else {
            return (
                <tr>
                    <h4>Empty here. You can add new Employees</h4>
                </tr>
            )
        }
    };

    return(
        <>
            {showList()}
        </>
    )
};

export default Employee