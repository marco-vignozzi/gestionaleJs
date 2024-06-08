import Icon from '../../lib/components/icon/Icon';
import '../../styles/inquilini.css';

function EditButton(props) {
    const { className, type, width, height, ...rest } = props;

    return (
        <button className={className} {...rest}>
            <Icon type={type} width={width} height={height} />
        </button>
    );
}

export default function InquiliniEdit(props) {
    const { editInputs, title = '', onClose, onDelete, onSave, activeInquilino = null, ...rest } = props;

    if (!activeInquilino || !editInputs) return null;

    return (
        <div {...rest} className="inquilini-edit">
            <div className="inquilini-edit-header">
                {title ? <div className="inquilini-edit-title">{title}</div> : null}
                <EditButton className="inquilini-edit-btn inquilini-edit-close-btn" type={'close'} onClick={onClose} />
            </div>
            {editInputs ? <div className="inquilini-edit-body">{Object.values(editInputs).map((el) => el)}</div> : null}
            <div className="inquilini-edit-footer">
                <EditButton
                    className="inquilini-edit-btn inquilini-edit-delete-btn"
                    width="20px"
                    height="20px"
                    type={'delete'}
                    onClick={onDelete}
                />
                <EditButton
                    className="inquilini-edit-btn inquilini-edit-delete-btn"
                    width="20px"
                    height="20px"
                    type={'save'}
                    onClick={onSave}
                />
            </div>
        </div>
    );
}
