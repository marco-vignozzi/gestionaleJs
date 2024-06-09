import Button from '../../lib/components/button/Button';
import '../../styles/inquilini.css';

export default function InquiliniEdit(props) {
    const { editInputs, title = '', onClose, onDelete, onSave, onAddPayment, activeInquilino = null, ...rest } = props;

    if (!activeInquilino || !editInputs) return null;

    return (
        <div {...rest} className="inquilini-edit">
            <div className="inquilini-edit-header">
                {title ? <div className="inquilini-edit-title">{title}</div> : null}
                <Button className="inquilini-edit-btn inquilini-edit-close-btn" type={'close'} onClick={onClose} />
            </div>
            {editInputs ? <div className="inquilini-edit-body">{Object.values(editInputs).map((el) => el)}</div> : null}
            <div className="inquilini-edit-footer">
                <Button
                    className="inquilini-edit-btn inquilini-edit-payment-btn"
                    label="Pagamenti"
                    width="20px"
                    height="20px"
                    type={'payment'}
                    onClick={onAddPayment}
                />
                <Button
                    className="inquilini-edit-btn inquilini-edit-save-btn"
                    width="20px"
                    height="20px"
                    type={'save'}
                    onClick={onSave}
                />
                <Button
                    className="inquilini-edit-btn inquilini-edit-delete-btn"
                    width="20px"
                    height="20px"
                    type={'delete'}
                    onClick={onDelete}
                />
            </div>
        </div>
    );
}
