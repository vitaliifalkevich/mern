import React from 'react';
import "./alert.scss"

function Alert(props) {
    return (
        <>
            {props.type === 'success' ? <div className="alert success"> {props.msg}</div> : ''}
            {props.type === 'notice' ? <div className="alert notice">
                {props.msg.map((itemError)=> {
                    return(
                        <>
                        {itemError.msg} <br/>
                        </>

                    )

                })}

            </div> : ''}
        </>
    )
}

export default Alert;