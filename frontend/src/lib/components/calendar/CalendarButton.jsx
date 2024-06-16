import React, { useState } from 'react';
import Button from '../button/Button';
import Calendar from './Calendar';
import '../../styles/calendar.css';

const getCalendarStyle = (placement, buttonRect, calendarSize) => {
    let top, left;

    switch (placement) {
        case 'top':
            top = buttonRect.top - calendarSize.height;
            left = buttonRect.left + buttonRect.width / 2 - calendarSize.width / 2;
            break;
        case 'bottom':
            top = buttonRect.bottom;
            left = buttonRect.left + buttonRect.width / 2 - calendarSize.width / 2;
            break;
        case 'right':
            top = buttonRect.top + buttonRect.height / 2 - calendarSize.height / 2;
            left = buttonRect.right;
            break;
        case 'left':
            top = buttonRect.top + buttonRect.height / 2 - calendarSize.height / 2;
            left = buttonRect.left - calendarSize.width;
            break;
        default:
            // Posizione di default o gestione degli errori
            top = buttonRect.bottom;
            left = buttonRect.left + buttonRect.width / 2 - calendarSize.width / 2;
            break;
    }

    return {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: `${calendarSize.width}px`,
        height: `${calendarSize.height}px`
    };
};

export default function CalendarButton(props) {
    const { rounded, data, placement = 'right' } = props;
    const [isOpen, setIsOpen] = useState(false);

    // Ottieni le dimensioni e la posizione del bottone
    const buttonRef = React.useRef(null);
    const calendarRef = React.useRef(null);
    const buttonRect = buttonRef.current ? buttonRef.current.getBoundingClientRect() : { top: 0, left: 0 };
    const calendarSize = { width: 200, height: 200 };

    const calendarStyle = buttonRect && getCalendarStyle(placement, buttonRect, calendarSize);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button ref={buttonRef} onClick={() => setIsOpen((state) => !state)} rounded={rounded} />
            {isOpen ? (
                <Calendar
                    ref={calendarRef}
                    style={calendarStyle}
                    data={data}
                    rounded={rounded}
                    placement={placement}
                    selectedDate={new Date('05-01-2022')}
                />
            ) : null}
        </div>
    );
}
