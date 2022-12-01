import React from "react";
import './Scroll.css'

const Scroll = (props) => {
    return (
        <div
        style={{
        overflowY: 'scroll', 
        border: '2px solid black',
        boxShadow: '0px 0px 5px black',
        borderRadius: '15px',
        height: '70vh',
        width: '96vw',
        marginLeft: 'Auto',
        marginRight: 'Auto',
        background: 'rgb(0, 189, 0)'
        }}>
            {props.children}
        </div>
    )
}

export default Scroll