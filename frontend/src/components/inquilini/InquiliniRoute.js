import { useState, useEffect } from 'react';
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
    const { data, update, query, ...rest } = useInquilini();

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
        if (!data || !Array.isArray(data) || query.isPending || update.isPending) return;
        // const data = {
        //     ...el,
        //     name: el.name?.includes('ARMINIO') ? 'FERRANDO 💪🏻' : 'ARMINIO 🧠'
        // };
        // update.mutate(data);
        const newData = processData(data);
        setRows(newData);
    }, [query.isPending, data, update.isPending]);

    // cosa fare quando cambio activeInquilino
    useEffect(() => {
        typeof initEditInput === 'function' && initEditInput(columns, activeInquilino);
    }, [activeInquilino]);

    const onDeleteInquilino = () => {
        window.confirm("Sei sicuro di voler eliminare definitivamente l'inquilino?") && setActiveInquilino(null);
    };
    const onCloseEdit = () => {
        window.confirm('Sei sicuro di voler chiudere? Le modifiche non salvate andranno perse') &&
            setActiveInquilino(null);
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
                    editInputs={editInputElements}
                    activeInquilino={activeInquilino}
                />
                <Table key={'inquilini-table'} className="inquilini-table" columns={columns} rows={rows} />
            </section>
            <InquiliniPagamenti key={'inquilini-pagamenti'} data={data} />
        </div>
    ) : null;
}
