import React from 'react';

// !!! RICORDA DI AGGIUNGERE REST !!!
export default function Icon(props) {
    const { type, width = '20px', height = '20px', ...rest } = props;
    switch (type) {
        case 'close':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" {...rest}>
                    <path
                        fill="currentColor"
                        d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z"
                    />
                </svg>
            );
        case 'delete':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 1024 1024" {...rest}>
                    <path
                        fill="currentColor"
                        d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
                    />
                </svg>
            );
        // Puoi aggiungere altri case per altre icone qui
        default:
            return null;
    }
}
