import Icon from '../icon/Icon';
import '../../styles/button.css';

export default function Button(props) {
    const { className, type, width, height, label, rounded, ...rest } = props;

    return (
        <button className={`btn ${className} ${rounded ? (label ? 'rounded' : 'full-rounded') : ''}`} {...rest}>
            {label ? <span className="btn-label">{label}</span> : null}
            <Icon className="btn-icon" type={type} width={width} height={height} />
        </button>
    );
}
