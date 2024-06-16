import { useRef, useState, useEffect } from 'react';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import '../../styles/search-banner.css';

export default function Banner(props) {
    const {
        className,
        inputClassName,
        btnClassName,
        inputValue: providedInputValue,
        inputPlaceholder,
        btnLabel,
        onSearch,
        onInputChange,
        title = 'as', // testo dell'intestazione
        searchBtn, // bool per il button di ricerca
        clearBtn = true, // bool per il button di cancellazione
        onClear,
        rounded // per avere un layout stondato
    } = props;

    const inputRef = useRef(null);
    // state per sapere se mostrare il bottone
    const [inputValue, setInputValue] = useState(providedInputValue || '');

    const [inputMainPosition, setInputMainPosition] = useState({ top: '0' });

    // use effect che definisce la funzione di aggiornamento della posizione dell'icona e del clear input
    useEffect(() => {
        const updateInputMainPosition = () => {
            if (inputRef.current) {
                const rect = inputRef.current.getBoundingClientRect();
                setInputMainPosition({ top: `${rect.height / 2}px` });
            }
        };
        updateInputMainPosition();
        window.addEventListener('resize', updateInputMainPosition);

        return () => {
            window.removeEventListener('resize', updateInputMainPosition);
        };
    }, []);

    // INPUT onClear del Button
    const _onClear = (e) => {
        setInputValue('');
        typeof onClear === 'function' && onClear();
        inputRef.current?.focus();
    };
    // INPUT onChange
    const _onChange = (e) => {
        setInputValue(inputRef.current?.value);
        typeof onInputChange === 'function' && onInputChange(e);
    };

    return (
        <div className={`search-banner ${className ? className : ''}`}>
            {title ? <div className="search-banner-title">Anagrafica Inquilini</div> : null}
            <div className="search-input-div">
                {/* INPUT SEARCH ICON*/}
                {!searchBtn ? (
                    <Icon
                        type="search"
                        className={`search-input-search-icon`}
                        style={{ top: parseInt(inputMainPosition.top) - 10 + 'px' }}
                    />
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
                        style={{ top: parseInt(inputMainPosition.top) - 12 + 'px' }}
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
