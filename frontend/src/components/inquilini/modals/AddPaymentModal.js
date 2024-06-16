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
// MODALE DI AGGIUNTA PAGAMENTO
export default function AddPaymentModal(props) {
    const { onClose, open, rows, inquilino } = props;
    return (
        <Modal className="pagamenti-modal" title="Aggiungi un pagamento" open={open} onClose={onClose}>
            {inquilino ? (
                <>
                    <div className="pagamenti-modal-subtitle">
                        <span className="pagamenti-modal-subtitle-label">Inquilino:</span>
                        <span className="pagamenti-modal-subtitle-name">
                            {' ' + inquilino.name + inquilino.secondName}
                        </span>
                    </div>
                    {rows ? (
                        <Table
                            key={'aggiunta-pagamento-table'}
                            className="pagamenti-table"
                            columns={columns}
                            rows={rows}
                        />
                    ) : null}
                </>
            ) : null}
        </Modal>
    );
}
