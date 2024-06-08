import { useState, useEffect, useCallback } from 'react';
import Table from '../../lib/components/table/Table';
import useInquilini from './use-inquilini';
import InquiliniPagamenti from './InquiliniPagamenti';
import InquiliniEdit from './InquiliniEdit';
import useEditInputs from '../../helpers/useEditInputs';
import Modal from '../../lib/components/modal/Modal';
import '../../styles/inquilini.css';

const columns = [
    { id: 'name', label: 'Nome', minWidth: 150 },
    {
        id: 'secondName',
        label: 'Cognome',
        minWidth: 150
    },
    {
        id: 'phone',
        label: 'Telefono',
        minWidth: 100
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 260
    },
    {
        id: 'address',
        label: 'Indirizzo',
        minWidth: 260
    },
    {
        id: 'city',
        label: 'Città',
        minWidth: 140
    },
    {
        id: 'country',
        label: 'Nazione',
        minWidth: 100
    }
];

export default function InquiliniRoute(props) {
    const { data, updateInquilini, query, deleteInquilino, ...rest } = useInquilini();

    // State che indica quale inquilino è attualmente selezionato
    // se null non mostro la edit
    const [activeInquilino, setActiveInquilino] = useState(null);
    const [rows, setRows] = useState([]);
    // Indica se è aperta la modale di aggiunta pagamento
    const [isAddingPayment, setIsAddingPayment] = useState(false);
    // Indica se è aperta la modale di visualizzazione dei pagamenti
    const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);

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

    return (
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
                    onAddPayment={(el) => {
                        console.log(el);
                        setIsAddingPayment(true);
                    }}
                />
                <Table key={'inquilini-table'} className="inquilini-table" columns={columns} rows={rows} />
            </section>
            <InquiliniPagamenti
                key={'inquilini-pagamenti'}
                data={data}
                openModal={(el) => {
                    console.log(el);
                    setIsPaymentsOpen(true);
                }}
            />
            <Modal
                className="adding-payments-modal"
                title="Aggiungi Pagamento"
                open={isAddingPayment}
                onClose={() => setIsAddingPayment(false)}
            />
            <Modal
                className="payments-modal"
                title="Storico Pagamenti"
                open={isPaymentsOpen}
                onClose={() => setIsPaymentsOpen(false)}
            />
        </div>
    );
}
