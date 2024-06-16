import Modal from '../components/modal/Modal';
import { useState } from 'react';

export default function useModal(modalProps) {
    const { className, title, onClose, ...rest } = modalProps;
    const [isOpen, setIsOpen] = useState(false);
    const _onClose = () => {
        // di base si chiude quando clicchi la chiusura o fuori
        setIsOpen(false);
        typeof onClose === 'function' && onClose();
    };
    return {
        modal: <Modal className={className} title={title} open={isOpen} onClose={_onClose} {...rest} />,
        setIsOpen
    };
}
