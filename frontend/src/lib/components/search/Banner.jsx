import React from 'react';
import Button from '../button/Button';
import '../../styles/search-banner.css';

export default function Banner(props) {
    const { className, inputClassName, btnClassName, inputValue, inputPlaceholder, btnLabel, onSearch, onInputChange } =
        props;
    return (
        <div className={`search-banner ${className ? className : ''}`}>
            <input
                className={`search-input ${inputClassName ? inputClassName : ''}`}
                placeholder={inputPlaceholder ? inputPlaceholder : 'Cerca...'}
                value={inputValue}
                onChange={onInputChange}
            />
            <Button
                className={`search-btn ${btnClassName ? btnClassName : ''}`}
                onClick={onSearch}
                type={'search'}
                label={btnLabel || btnLabel === '' ? btnLabel : 'Cerca'}
            />
        </div>
    );
}
