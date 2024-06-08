import React from 'react';
import ReactDom from 'react-dom';
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
    const { open, onClose, title, className, children, ...rest } = props;
    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className={`modal-panel ${className ? className : ''}`} {...rest}>
                <div className="modal-header">
                    {title ? <span className="modal-title">{title}</span> : null}
                    <CloseButton
                        type="close"
                        className="modal-close-btn"
                        onClick={onClose}
                        width="35px"
                        height="35px"
                    />
                </div>
                {children ? { ...children } : null}
            </div>
        </>,
        document.getElementById('portal')
    );
}
