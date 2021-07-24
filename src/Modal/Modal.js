import React from 'react'
import './Modal.css'

function Modal({modalState}){

    return(
        <div className='modal' style={{display: modalState.modalStateAttr}}>
            <div className='modal-body' >
                <h1 >{modalState.content}</h1>
                <div className='animation'></div>
            </div>
        </div>
    )
}

export default Modal