import { useNavigate } from "react-router-dom";
import "../styles/NavButton.css";

export function NavButton({ text, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button className="nav-button" onClick={handleClick}>
            <span>{text}</span>
        </button>
    );
}   
