import Icon from '../../lib/components/icon/Icon';
import '../../styles/inquilini.css';

function EditButton(props) {
    const { className, type, ...rest } = props;

    return (
        <button className={className} {...rest}>
            <Icon type={type} />
        </button>
    );
}

export default function InquiliniEdit(props) {
    const { editInputs, title = '', onClose, onDelete, activeInquilino = null, ...rest } = props;

    if (!activeInquilino || !editInputs) return null;

    return (
        <div {...rest} className="inquilini-edit">
            {title ? (
                <div className="inquilini-edit-header">
                    <div className="inquilini-edit-title">{title}</div>
                    <EditButton
                        className="inquilini-edit-btn inquilini-edit-close-btn"
                        type={'close'}
                        onClick={onClose}
                    />
                </div>
            ) : null}
            {editInputs ? <div className="inquilini-edit-body">{Object.values(editInputs).map((el) => el)}</div> : null}
            <div className="inquilini-edit-footer">
                <EditButton
                    className="inquilini-edit-btn inquilini-edit-delete-btn"
                    width="30px"
                    height="30px"
                    type={'delete'}
                    onClick={onDelete}
                />
                <EditButton
                    className="inquilini-edit-btn inquilini-edit-delete-btn"
                    type={'delete'}
                    onClick={onDelete}
                />
                <EditButton
                    className="inquilini-edit-btn inquilini-edit-delete-btn"
                    type={'delete'}
                    onClick={onDelete}
                />
            </div>
        </div>
    );
}
