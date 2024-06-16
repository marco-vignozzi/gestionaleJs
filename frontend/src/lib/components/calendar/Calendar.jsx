import React from 'react';
import '../../styles/calendar.css';

const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const monthsOfYear = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
]; // Mesi dell'anno in italiano

export default function Calendar(props) {
    const {
        selectedDate,
        className,
        rounded,
        // data da passare nella forma: per ogni giorno del mese rappresentato
        data /*  ={
            '2024-06-01': <span style={{ color: 'green' }}>Event 1</span>
        }, */,
        ...rest
    } = props;
    const displayDate = selectedDate || new Date();
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth(); // 0-based
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // numero di giorni nel mese selezionato
    const startDay = new Date(year, month, 1).getDay(); // giorno della settimana in cui inizia il mese selezionato
    // Calcola l'indice di partenza corretto per il lunedì
    const startDayIndex = startDay === 0 ? 6 : startDay - 1; // Se startDay è Domenica (0), inizia con Sabato (6), altrimenti startDay - 1
    const days = [];

    // Aggiungi i giorni vuoti fino all'inizio del mese
    for (let i = 0; i < startDayIndex; i++) {
        days.push(<div key={`empty-${i}`} className={'day empty' + (rounded ? ' rounded' : '')}></div>);
    }

    // Aggiungi i giorni del mese
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const isToday = date.toDateString() === new Date().toDateString(); // verifica se è oggi
        const isSelected = displayDate && date.toDateString() === displayDate.toDateString(); // verifica se è il giorno selezionato
        const dateString = date.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

        // se ho passato data prendo il contenuto relativo
        const content = data && data[dateString] ? data[dateString] : i;

        // aggiungo classnames
        const classNames = ['day'];
        // se selected non viene sovrascritto
        isSelected && classNames.push('selected');
        isToday && classNames.push('today');
        rounded && classNames.push('rounded');

        // inserisco i il contenuto
        days.push(
            <div key={i} className={classNames.join(' ')}>
                {content}
            </div>
        );
    }

    return (
        <div className={'calendar' + (rounded ? ' rounded' : '') + (className ? ' ' + className : '')} {...rest}>
            <div className="month-year">
                <span>
                    {monthsOfYear[month]} {year}
                </span>
            </div>
            <div className="days-of-week">
                {daysOfWeek.map((day) => (
                    <div key={day} className={'day-of-week'}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="days">{days}</div>
        </div>
    );
}
