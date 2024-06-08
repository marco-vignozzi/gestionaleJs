import React from 'react';
import Icon from '../icon/Icon';
import '../styles/modal.css';

function CloseButton(props) {
    const { className, type, width, height, ...rest } = props;

    return (
        <button className={className} {...rest}>
            <Icon type={type} width={width} height={height} />
        </button>
    );
}

export default function Modal(props) {
    const { open, onClose, className, ...rest } = props;
    if (!open) return null;
    return (
        <>
            <div className="modal-overlay"></div>
            <div className={`modal-panel ${className ? className : ''}`} {...rest}>
                <div className="modal-header">
                    <CloseButton type="close" className="close-btn" onClick={onClose} width="35px" height="35px" />
                </div>
            </div>
        </>
    );
}
