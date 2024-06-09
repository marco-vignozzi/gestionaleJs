import { useState, useEffect, useCallback } from 'react';
import Table from '../lib/components/table/Table';
import useInquilini from '../components/inquilini/use-inquilini';
import InquiliniPagamenti from '../components/inquilini/InquiliniPagamenti';
import InquiliniEdit from '../components/inquilini/InquiliniEdit';
import useEditInputs from '../components/hooks/useEditInputs';
import Modal from '../lib/components/modal/Modal';
import SearchBanner from '../lib/components/search/Banner';
import '../styles/inquilini.css';
import useModal from '../lib/hooks/useModal';

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
    // MODALE AGGIUNTA PAGAMENTO
    const { modal: addPaymentModal, setIsOpen: setIsOpenAddPayment } = useModal({
        className: 'add-payments-modal',
        title: 'Aggiungi Pagamento'
    });
    // MODALE AGGIUNTA PAGAMENTO
    const { modal: paymentsModal, setIsOpen: setIsOpenPayments } = useModal({
        className: 'payments-modal',
        title: 'Storico Pagamenti'
    });

    // State della stringa cercata
    const [queryString, setQueryString] = useState('');

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
    // funzione che filtra i dati in base alla stringa cercata
    const filterData = (query) => {
        const filtered = data.filter((el) =>
            Object.entries(el).some(
                ([key, val]) =>
                    key !== '_id' &&
                    key !== 'type' &&
                    typeof val === 'string' &&
                    val.toLowerCase().includes(query.toLowerCase())
            )
        );
        console.log('dati:', data);
        console.log("filtrati con query string '" + query + "':", filtered);
        return filtered;
    };

    // cosa fare quando arrivano i dati o scrivo nella searchbar
    useEffect(() => {
        if (!data || !Array.isArray(data) || query.isPending || updateInquilini.isPending) return;
        let newData;
        if (queryString) newData = filterData(queryString); // filtro in base alla query string
        newData = processData(newData ? newData : data); // se ho filtrato processo i dati nuovi
        console.log('NUOVE RIGHE: ', newData);
        setRows(newData);
    }, [data, queryString, query.isPending, updateInquilini.isPending]);
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
        <div className="search-div" {...rest}>
            <section className="inquilini-search-section">
                <SearchBanner
                    className="inquilini-search-banner"
                    inputPlaceholder={'Filtra gli inquilini...'}
                    inputValue={queryString}
                    onInputChange={(e) => setQueryString(e.target.value)}
                />
            </section>
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
                        setIsOpenAddPayment(true);
                    }}
                />
                <Table key={'inquilini-table'} className="inquilini-table" columns={columns} rows={rows} />
            </section>
            <InquiliniPagamenti
                key={'inquilini-pagamenti'}
                data={data}
                openModal={(el) => {
                    console.log(el);
                    setIsOpenPayments(true);
                }}
            />
            {addPaymentModal}
            {paymentsModal}
        </div>
    );
}
