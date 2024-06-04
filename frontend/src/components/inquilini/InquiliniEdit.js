import '../../styles/inquilini.css';

export default function InquiliniEdit(props) {
    const { editInputs, ...rest } = props;
    return (
        <div {...rest} className="inquilini-edit">
            {editInputs ? Object.values(editInputs).map((el) => el) : null}
        </div>
    );
}
