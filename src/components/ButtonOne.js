import { useNavigate } from "react-router-dom";
import "../styles/ButtonOne.css"

export function ButtonOne({ text, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button className="ButtonOne" onClick={handleClick}>
            <span className="text-button">{text}</span>
        </button>
    );
}   
