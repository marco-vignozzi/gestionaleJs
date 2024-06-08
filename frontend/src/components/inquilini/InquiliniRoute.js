import { useState, useEffect, useCallback } from 'react';
import Table from '../table/Table';
import useInquilini from './use-inquilini';
import InquiliniPagamenti from './InquiliniPagamenti';
import InquiliniEdit from './InquiliniEdit';
import useEditInputs from '../../helpers/useEditInputs';
import '../../styles/inquilini.css';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
        id: 'secondName',
        label: 'Second Name',
        minWidth: 170
    },
    {
        id: 'country',
        label: 'Country',
        minWidth: 170
    },
    {
        id: 'city',
        label: 'City',
        minWidth: 170
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 170
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170
    }
];

export default function InquiliniRoute(props) {
    const { data, updateInquilini, query, deleteInquilino, ...rest } = useInquilini();

    // State che indica quale inquilino è attualmente selezionato
    // se null non mostro la edit
    const [activeInquilino, setActiveInquilino] = useState(null);
    const [rows, setRows] = useState([]);

    const {
        inputElements: editInputElements,
        inputStates: editInputStates,
        init: initEditInput
    } = useEditInputs(columns, activeInquilino);

    // funzione che processa i dati prima di mandarli alla table
    const processData = (data) =>
        data.map((el, i) => {
            const onClick = (e) => {
                console.log('Clicked: ', el);
                setActiveInquilino(el);
            };
            // aggiungo onClick e className da associare alle righe della table
            return {
                ...el,
                onClick: onClick,
                className: 'inquilini-row'
            };
        });

    // cosa fare quando arrivano i dati
    useEffect(() => {
        if (!data || !Array.isArray(data) || query.isPending || updateInquilini.isPending) return;
        // const data = {
        //     ...el,
        //     name: el.name?.includes('ARMINIO') ? 'FERRANDO 💪🏻' : 'ARMINIO 🧠'
        // };
        // updateInquilini.mutate(data);
        const newData = processData(data);
        setRows(newData);
    }, [query.isPending, data, updateInquilini.isPending]);

    // cosa fare quando cambio activeInquilino
    useEffect(() => {
        typeof initEditInput === 'function' && initEditInput(columns, activeInquilino);
    }, [activeInquilino]);

    const onDeleteInquilino = useCallback(() => {
        if (window.confirm("Eliminare definitivamente l'inquilino?")) {
            deleteInquilino.mutate(activeInquilino._id);
            setActiveInquilino(null);
        }
    }, [deleteInquilino, activeInquilino]);

    const onSaveInquilino = () => {
        window.confirm('Salvare le modifiche?') &&
            updateInquilini.mutate({ ...editInputStates, type: 'inquilino', _id: activeInquilino._id });
    };

    const onCloseEdit = () => {
        window.confirm('Annullare le modifiche?') && setActiveInquilino(null);
    };

    return data ? (
        <div className="search-div">
            {/* <SearchBanner/> */}
            <div className="inquilini-search">SEARCHBANNER</div>
            <section className="inquilini-edit-section">
                <InquiliniEdit
                    key={'inquilini-edit'}
                    title="Modifica Inquilino"
                    onClose={onCloseEdit}
                    onDelete={onDeleteInquilino}
                    onSave={onSaveInquilino}
                    editInputs={editInputElements}
                    activeInquilino={activeInquilino}
                />
                <Table key={'inquilini-table'} className="inquilini-table" columns={columns} rows={rows} />
            </section>
            <InquiliniPagamenti key={'inquilini-pagamenti'} data={data} />
        </div>
    ) : null;
}
