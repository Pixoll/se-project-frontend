import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavButton.css";

type NavButtonProps = {
    text: string;
    to: string;
    style?: CSSProperties;
};

export function NavButton({ text, to, style }: NavButtonProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button className="nav-button" onClick={handleClick} style={style}>
            <span>{text}</span>
        </button>
    );
}   
