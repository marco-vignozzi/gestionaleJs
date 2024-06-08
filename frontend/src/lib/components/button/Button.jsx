import Icon from '../icon/Icon';
import '../../styles/button.css';

export default function Button(props) {
    const { className, type, width, height, label, ...rest } = props;

    return (
        <button className={`btn ${className}`} {...rest}>
            {label ? <span className="btn-label">{label}</span> : null}
            <Icon className="btn-icon" type={type} width={width} height={height} />
        </button>
    );
}
