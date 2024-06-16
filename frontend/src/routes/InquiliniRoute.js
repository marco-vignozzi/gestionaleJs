import { useState, useEffect, useCallback } from 'react';
import Table from '../lib/components/table/Table';
import SearchBanner from '../lib/components/search/Banner';
import InquiliniPagamenti from '../components/inquilini/InquiliniPagamenti';
import InquiliniEdit from '../components/inquilini/InquiliniEdit';
import useInquilini from '../components/inquilini/use-inquilini';
import usePagamenti from '../components/inquilini/use-pagamenti';
import useEditInputs from '../components/hooks/useEditInputs';
import '../styles/inquilini.css';
import PaymentsModal from '../components/inquilini/modals/PaymentsModal';
import AddPaymentModal from '../components/inquilini/modals/AddPaymentModal';

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
    // DATI INQUILINI dal server
    const { data: inquiliniData, updateInquilini, query: inquiliniQuery, deleteInquilino } = useInquilini();
    // DATI PAGAMENTI dal server
    const { data: pagamentiData, updatePagamenti, query: pagamentiQuery, deletePagamento } = usePagamenti();

    // State della stringa cercata
    const [queryString, setQueryString] = useState('');
    // Righe della table inquilini
    const [inquiliniRows, setInquiliniRows] = useState([]);
    // Righe della table pagamenti
    const [pagamentiRows, setPagamentiRows] = useState([]);
    // State dell'inquilino attualmente selezionato; se null non mostro la edit
    const [activeInquilino, setActiveInquilino] = useState(null);
    // State dell'inquilino passato alla modale; se null non mostro la modale
    const [inquilinoModalData, setInquilinoModalData] = useState(null);

    // INPUT DELL'EDIT
    const {
        inputElements: editInputElements,
        inputStates: editInputStates,
        init: initEditInput
    } = useEditInputs(columns, activeInquilino);

    // MODALI
    const [paymentsModal, showPaymentsModal] = useState(false);
    const [addPaymentModal, showAddPaymentModal] = useState(false);

    // MODALE AGGIUNTA PAGAMENTO
    // const { modal: addPaymentModal, setIsOpen: showAddPaymentModal } = useModal({
    //     className: 'add-payments-modal',
    //     title: 'Aggiungi Pagamento'
    // });

    ///////////////////////////////////////////////
    // HELPERS
    // funzioni che processano i dati prima di mandarli alle table
    const makeInquiliniRows = (data) =>
        data.map((el, i) => {
            // sul click cambio inquilino attivo
            el.onClick = (e) => {
                console.log('Clicked: ', el);
                // codice per cambiare inquilino mostrato nell'edit
                setActiveInquilino(el);
                typeof initEditInput === 'function' && initEditInput(columns, el);
            };
            el.className = 'inquilini-row';
            // aggiungo onClick e className da associare alle righe della table
            return el;
        });
    const makePagamentiRows = (data) =>
        data.map((el, i) => {
            el.amount = (+el.amount).toFixed(2) + ' ' + '€';
            el.date = '10/10/VAFFANCULO';
            el.className = 'pagamenti-row' + (el.isIncoming ? ' incoming' : '');
            // aggiungo onClick e className da associare alle righe della table
            return el;
        });

    // funzione che filtra i dati in base alla stringa cercata
    const filterInquilini = (query) => {
        let filtered = inquiliniData;
        if (query)
            filtered = inquiliniData.filter((el) =>
                Object.entries(el).some(
                    ([key, val]) =>
                        key !== '_id' &&
                        key !== 'type' &&
                        typeof val === 'string' &&
                        val.toLowerCase().includes(query.toLowerCase())
                )
            );
        console.log('dati:', inquiliniData);
        console.log("filtrati con query string '" + query + "':", filtered);
        return filtered ? filtered : [];
    };

    // aggiornamento inquilini fetch e update
    useEffect(() => {
        if (!inquiliniData || !Array.isArray(inquiliniData) || inquiliniQuery.isPending || updateInquilini.isPending)
            return;
        const newData = makeInquiliniRows(inquiliniData); // se ho filtrato processo i dati nuovi
        console.log('NUOVI INQUILINI: ', newData);
        setInquiliniRows(newData);
    }, [inquiliniData, inquiliniQuery.isPending, updateInquilini.isPending]);

    // aggiornamento per la ricerca
    useEffect(() => {
        const newData = filterInquilini(queryString); // filtro in base alla query string
        setInquiliniRows(newData);
    }, [queryString]);

    // aggiornamento pagamenti fetch e update
    useEffect(() => {
        if (!pagamentiData || !Array.isArray(pagamentiData) || pagamentiQuery.isPending || updatePagamenti.isPending)
            return;
        console.log('NUOVI PAGAMENTI: ', pagamentiData);
        const newData = makePagamentiRows(pagamentiData);
        setPagamentiRows(newData);
    }, [pagamentiData, pagamentiQuery.isPending, updatePagamenti.isPending]);

    // aggiornamento per il cambio inquilino
    useEffect(() => {
        if (!inquilinoModalData) return;
        const newData = pagamentiData.filter((el) => el.id_inquilino === inquilinoModalData._id); // filtro in base all'inquilino cliccato
        setPagamentiRows(newData);
    }, [inquilinoModalData]);

    // // cosa fare quando cambio activeInquilino
    // useEffect(() => {
    //     typeof initEditInput === 'function' && initEditInput(columns, activeInquilino);
    // }, [activeInquilino]);

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
        <div className="search-div" {...props}>
            <section className="inquilini-search-section">
                <SearchBanner
                    className="inquilini-search-banner"
                    inputPlaceholder={'Filtra gli inquilini...'}
                    inputValue={queryString}
                    title="Anagrafica Inquilini"
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
                        setInquilinoModalData(activeInquilino);
                        showAddPaymentModal(true);
                    }}
                />
                <Table key={'inquilini-table'} className="inquilini-table" columns={columns} rows={inquiliniRows} />
            </section>
            <section>
                <InquiliniPagamenti
                    key={'inquilini-pagamenti'}
                    data={inquiliniData}
                    openModal={(el) => {
                        console.log(el);
                        setInquilinoModalData(el);
                        showPaymentsModal(true);
                    }}
                />
            </section>
            <AddPaymentModal
                rows={pagamentiRows}
                open={addPaymentModal}
                inquilino={inquilinoModalData}
                onClose={() => {
                    setInquilinoModalData(null);
                    showAddPaymentModal(false);
                }}
            />
            <PaymentsModal
                rows={pagamentiRows}
                open={paymentsModal}
                inquilino={inquilinoModalData}
                onClose={() => {
                    setInquilinoModalData(null);
                    showPaymentsModal(false);
                }}
            />
        </div>
    );
}
