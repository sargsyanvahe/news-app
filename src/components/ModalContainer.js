import React from "react";

export default function ModalContainer(props) {
    return (
        <div className='modal-container'>
            {props.children}
        </div>
    )
}