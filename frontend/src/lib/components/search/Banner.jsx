import { useRef, useState } from 'react';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import '../../styles/search-banner.css';

export default function Banner(props) {
    const {
        className,
        inputClassName,
        btnClassName,
        providedInputValue = 'PATATO',
        inputPlaceholder,
        btnLabel,
        onSearch,
        onInputChange,
        searchBtn, // bool per il button di ricerca
        clearBtn, // bool per il button di cancellazione
        onClear,
        rounded // per avere un layout stondato
    } = props;

    const inputRef = useRef(null);
    // state per sapere se mostrare il bottone
    const [inputValue, setInputValue] = useState(providedInputValue || '');

    // INPUT onClear del Button
    const _onClear = (e) => {
        typeof onClear === 'function' && onClear();
        setInputValue('');
        inputRef.current?.focus();
    };
    // INPUT onChange
    const _onChange = (e) => {
        setInputValue(inputRef.current?.value);
        typeof onInputChange === 'function' && onInputChange(e);
    };

    return (
        <div className={`search-banner ${className ? className : ''}`}>
            <div className="search-input-div">
                {/* INPUT SEARCH ICON*/}
                {!searchBtn ? (
                    <Icon type="search" className={`search-input-search-icon ${!searchBtn ? 'full' : ''}`} />
                ) : null}
                {/* INPUT */}
                <input
                    ref={inputRef}
                    className={`search-input ${inputClassName ? inputClassName : ''} ${rounded ? 'rounded' : ''} ${
                        !searchBtn ? 'full' : ''
                    }`}
                    // {searchBtn ? '' : 'full'}`}
                    placeholder={inputPlaceholder ? inputPlaceholder : 'Cerca...'}
                    value={inputValue}
                    onChange={_onChange}
                />
                {/* INPUT CLEAR BUTTON */}
                {clearBtn && inputValue ? (
                    <Button
                        className={`search-input-clear-btn ${!searchBtn ? 'full' : ''}`}
                        rounded={true}
                        onClick={_onClear}
                        type="close"
                    />
                ) : null}
                {/* INPUT SEARCH BUTTON */}
                {searchBtn ? (
                    <Button
                        className={`search-btn ${btnClassName ? btnClassName : ''} ${rounded ? 'rounded' : ''}`}
                        onClick={onSearch}
                        type={'search'}
                        label={btnLabel || btnLabel === '' ? btnLabel : 'Cerca'}
                    />
                ) : null}
            </div>
        </div>
    );
}
