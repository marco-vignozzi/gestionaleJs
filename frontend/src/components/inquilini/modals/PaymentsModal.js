import Modal from '../../../lib/components/modal/Modal';
import Table from '../../../lib/components/table/Table';

const columns = [
    { id: 'amount', label: 'Somma', minWidth: 100 },
    {
        id: 'date',
        label: 'Data',
        minWidth: 150
    }
];
// MODALE STORICO PAGAMENTI
export default function PaymentsModal(props) {
    const { rows, inquilino, onClose, open } = props;
    return (
        <Modal className="pagamenti-modal" title="Storico Pagamenti" open={open} onClose={onClose}>
            {rows ? (
                <Table key={'storico-pagamenti-table'} className="pagamenti-table" columns={columns} rows={rows} />
            ) : null}
        </Modal>
    );
}
