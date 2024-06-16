import { useRef, useState, useEffect } from 'react';
import Input from '../../../lib/components/input/Input';
import '../../styles/search-banner.css';

export default function Banner(props) {
    const {
        className,
        inputValue: providedInputValue,
        onSearch,
        onInputChange,
        title // testo dell'intestazione
    } = props;

    return (
        <div className={`search-banner ${className ? className : ''}`}>
            {title ? <div className="search-banner-title">{title}</div> : null}
            <Input iconType="search" placeholder="Cerca..." className="search-input" />
        </div>
    );
}
