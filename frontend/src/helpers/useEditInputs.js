import { useReducer, useState } from 'react';

export default function useEditInputs(keysData, inquilinoData) {
    const initialState = (columns, data) => {
        if (!columns || !data) return {};
        const state = {};
        // inizializzo con i valori di inquilinoData
        // lo state è un oggetto con chiave l'id della colonna e valore il valore dell'input che modifica quel campo
        columns.forEach((col) => {
            state[col.id] = data[col.id] || '';
        });
        return state;
    };

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

    const [inputStates, dispatch] = useReducer(reducer, {}, () => initialState(keysData, inquilinoData));

    if (!keysData || !inquilinoData) return {};
    const inputElements = {};
    keysData.forEach((el) => {
        // Creao un oggetto dove per ogni chiave di inquilino c'è l'elemento input
        inputElements[`${el.id}`] = (
            <div className="inquilini-edit-row">
                <label
                    htmlFor={`inquilini-input-${el.id}`}
                    key={`inquilini-input-label-${el.id}`}
                    className="input-label"
                >
                    {el.label}
                </label>
                <input
                    id={`inquilini-input-${el.id}`}
                    key={`inquilini-input-${el.id}`}
                    className="edit-input inquilini-edit-input"
                    value={inputStates[el.id]}
                    onChange={(e) => dispatch(/* ACTION: */ { type: 'UPDATE_INPUT', id: el.id, value: e.target.value })}
                ></input>
            </div>
        );
    });

    const init = (columns, data) => dispatch({ type: 'INIT', columns, data });

    return { inputStates, inputElements, init };
}
