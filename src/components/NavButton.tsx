import { useNavigate } from "react-router-dom";
import "../styles/NavButton.css";

type NavButtonProps = {
    text: string;
    to: string;
};

export function NavButton({ text, to }: NavButtonProps) {
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
