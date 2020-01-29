import React, {Fragment} from 'react';
import Employees from "./Employees";
import Login from '../components/Auth/Login'


const Main = (props)=> {
    return(
        <Fragment>
            {props.checkHASH === true ? <Employees/> : <Login/>}
        </Fragment>
    )
};



export default Main;