import React, { useReducer } from 'react';

function EditInput(props) {
    const { id, label, value, onChange } = props;
    return (
        <div className="inquilini-edit-row">
            {label ? (
                <label htmlFor={`inquilini-input-${id}`} className="input-label">
                    {label}
                </label>
            ) : null}
            <input
                id={`inquilini-input-${id}`}
                className="edit-input inquilini-edit-input"
                value={value}
                onChange={onChange}
            ></input>
        </div>
    );
}

// COMPORTAMENTO AZIONI
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return initialState(action.columns, action.data);
        case 'UPDATE_INPUT':
            return {
                ...state,
                [action.id]: action.value
            };
        default:
            return state;
    }
};
// STATO INIZIALE
const initialState = (columns, data) => {
    if (!columns || !data) return {};
    const state = {};
    // inizializzo con i valori di data
    // lo state è un oggetto con chiave l'id della colonna e valore il valore dell'input che modifica quel campo
    columns.forEach((col) => {
        state[col.id] = data[col.id] || '';
    });
    return state;
};

export default function useEditInputs(keysData, data) {
    const [inputStates, dispatch] = useReducer(reducer, { columns: keysData, data: data }, initialState);

    if (!inputStates /* !keysData || !data */) return {};
    const inputElements = {};
    keysData.forEach((el) => {
        // Creao un oggetto dove per ogni chiave di inquilino c'è l'elemento input
        inputElements[`${el.id}`] =
            inputStates[el.id] !== undefined ? (
                <EditInput
                    key={`inquilini-input-${el.id}`}
                    id={el.id}
                    value={inputStates[el.id]}
                    label={el.label}
                    onChange={(e) => dispatch(/* ACTION: */ { type: 'UPDATE_INPUT', id: el.id, value: e.target.value })}
                />
            ) : null;
    });

    const init = (columns, data) => dispatch({ type: 'INIT', columns, data });

    // inputStates sono le coppie chiave valore dei dati che passi
    return { inputStates, inputElements, init };
}
