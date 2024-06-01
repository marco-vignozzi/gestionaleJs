import '../../styles/navbar.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
    const { options } = props;

    const navigate = useNavigate();
    return (
        <div className="navbar">
            {options?.map((el, i) => {
                return (
                    <button
                        key={`navbar-btn-${i}`}
                        className="navbar-btn"
                        onClick={() => {
                            el.onClick && el.onClick();
                            navigate(el.path);
                        }}
                    >
                        <span>{el.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
