import React from 'react';

export default function Modal(props) {
    const { open } = props;
    if (!open) return null;
    return <div></div>;
}
