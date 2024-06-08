import React from 'react';
import ReactDom from 'react-dom';
import Button from '../button/Button';
import '../../styles/modal.css';

export default function Modal(props) {
    const { open, onClose, title, className, children, ...rest } = props;
    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className={`modal-panel ${className ? className : ''}`} {...rest}>
                <div className="modal-header">
                    {title ? <span className="modal-title">{title}</span> : null}
                    <Button type="close" className="modal-close-btn" onClick={onClose} width="35px" height="35px" />
                </div>
                {children ? { ...children } : null}
            </div>
        </>,
        // creo il portal connesso alla div con id 'portal' in basso nel body dell'index.html
        document.getElementById('portal')
    );
}
