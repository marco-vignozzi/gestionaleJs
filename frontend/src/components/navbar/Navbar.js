import '../../styles/navbar.css';

export default function Navbar(props) {
    const { options } = props;
    return (
        <div className="navbar">
            {options?.map((el) => {
                return (
                    <button className="navbar-btn" onClick={el.onClick}>
                        <span>{el.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
