import Modal from '../components/modal/Modal';
import { useState } from 'react';

export default function useModal(modalProps) {
    const { className, title, onClose } = modalProps;
    const [isOpen, setIsOpen] = useState(false);
    const _onClose = () => {
        setIsOpen(false);
        typeof onClose === 'function' && onClose();
    };

    return { modal: <Modal className={className} title={title} open={isOpen} onClose={_onClose} />, setIsOpen };
}
