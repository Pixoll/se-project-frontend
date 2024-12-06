import { useNavigate } from "react-router-dom";
import "../styles/BackButton.css";

export function BackButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <button className="back-button" onClick={handleClick}>
            <span>Go back</span>
        </button>
    );
}
