import { useRef, useState, useEffect } from 'react';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import '../../styles/input.css';

export default function Input(props) {
    const {
        label,
        btnLabel,
        value,
        clearBtn = true, // se true sarà presente il button di cancellazione
        className,
        iconClassName,
        btnClassName,
        onClickBtn,
        rounded,
        onChange,
        onClear,
        placeholder,
        btnType, // scegliere l'icona e lo stile del bottone
        iconType, // sceglie l'icona
        ...rest
    } = props;

    const inputRef = useRef(null);
    // state per sapere se mostrare il bottone
    const [inputValue, setInputValue] = useState(value || '');

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
        typeof onChange === 'function' && onChange(e);
    };

    // CREO I CLASSNAMES
    const roundedClass = rounded ? 'rounded' : '';
    const fullClass = !btnType ? 'full' : '';
    const iconClass = iconType ? 'w-icon' : '';
    const classNames = {
        icon: [iconClassName ? iconClassName.split(' ') : '', 'input-icon'],
        input: [className ? className?.split(' ') : '', 'input'],
        clearBtn: [iconClassName ? iconClassName?.split(' ') : '', 'input-clear-btn'],
        inputBtn: [btnClassName ? btnClassName?.split(' ') : '', 'input-btn']
    };
    Object.keys(classNames).forEach((key) => {
        classNames[key] = classNames[key]
            .flat()
            .concat(roundedClass, fullClass, iconClass)
            .filter((className) => className);
    });

    return (
        <div className="input-div">
            {/* INPUT ICON*/}
            {iconType ? (
                <Icon
                    type={iconType}
                    className={classNames.icon.join(' ')}
                    style={{ top: parseInt(inputMainPosition.top) - 10 + 'px' }}
                />
            ) : null}
            {/* INPUT */}
            <input
                ref={inputRef}
                className={classNames.input.join(' ')}
                placeholder={placeholder ? placeholder : ''}
                value={inputValue}
                onChange={_onChange}
                {...rest}
            />
            {/* INPUT CLEAR BUTTON */}
            {clearBtn && inputValue ? (
                <Button
                    className={classNames.clearBtn.join(' ')}
                    rounded={true}
                    onClick={_onClear}
                    type="close"
                    style={{ top: parseInt(inputMainPosition.top) - 12 + 'px' }}
                />
            ) : null}
            {/* INPUT BUTTON */}
            {btnType ? (
                <Button
                    className={classNames.inputBtn.join(' ')}
                    onClick={onClickBtn}
                    type={'search'}
                    label={btnLabel || btnLabel === '' ? btnLabel : ''}
                />
            ) : null}
        </div>
    );
}
