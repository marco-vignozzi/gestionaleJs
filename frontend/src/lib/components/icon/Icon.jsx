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
        case 'save':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 1024 1024" {...rest}>
                    <path
                        fill="currentColor"
                        d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2M384 184h256v104H384zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144m0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80"
                    />
                </svg>
            );
        case 'payment':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 48 48" {...rest}>
                    <g fill="none">
                        <g fill="currentColor" clipPath="url(#healthiconsMoneyBagNegative0)">
                            <path d="M14.696 9.561c.924.291 1.904.545 2.9.729c2.159.398 4.333.457 6.193-.08c2.364-.685 4.845-1.239 7.17-1.567c-1.984-.653-4.383-1.17-6.92-1.17c-3.662 0-7.062 1.075-9.343 2.088" />
                            <path
                                fillRule="evenodd"
                                d="M28.772 24.667A4 4 0 0 0 25 22v-1h-2v1a4 4 0 0 0 0 8v4c-.87 0-1.611-.555-1.887-1.333a1 1 0 1 0-1.885.666A4 4 0 0 0 23 36v1h2v-1a4 4 0 0 0 0-8v-4c.87 0 1.611.555 1.887 1.333a1 1 0 1 0 1.885-.666M23 24a2 2 0 1 0 0 4zm2 10a2 2 0 1 0 0-4z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M48 0H0v48h48zM12.972 8.385c2.435-1.22 6.55-2.711 11.067-2.711c4.433 0 8.449 1.437 10.873 2.643l.015.007l.105.053c.654.33 1.184.641 1.568.897l-2.619 3.828l-1.48.768c-5.097 2.572-11.931 2.572-17.027 0l-1.304-.519l-2.77-4.077c.257-.169.578-.361.956-.567q.287-.157.616-.322m20.34 7.092l.245-.123C41.913 24.282 48.5 41.67 24.039 41.67s-18.03-17.07-9.61-26.31l.234.118c5.606 2.828 13.042 2.828 18.649 0"
                                clipRule="evenodd"
                            />
                        </g>
                        <defs>
                            <clipPath id="healthiconsMoneyBagNegative0">
                                <path d="M0 0h48v48H0z" />
                            </clipPath>
                        </defs>
                    </g>
                </svg>
            );
        case 'search':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 1024 1024" {...rest}>
                    <path
                        fill="currentColor"
                        d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1S492.1 112 412 112s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6M570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4"
                    />
                </svg>
            );
        // Puoi aggiungere altri case per altre icone qui
        default:
            return null;
    }
}
