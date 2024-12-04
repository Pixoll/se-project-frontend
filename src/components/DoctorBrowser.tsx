import { useState } from "react";
import "../styles/DoctorBrowser.css"
import { useNavigate } from "react-router-dom";

export function DoctorBrowser() {
    const [specialist, setSpecialist] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("algo");
    };

    return (
        <div className="browser-container">
            <h3 className="title">BUSCA TU ESPECIALISTA</h3>
            <form className="browser-form">
                <input
                    type="specialist"
                    value={specialist}
                    onChange={(e) => setSpecialist(e.target.value)}
                    placeholder="Especialidad"
                    required
                />
                <input
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del especilista"
                    required
                />
                <button type="submit" className="browser-button" onClick={handleClick}>
                    <span>Buscar</span>
                </button>
            </form>
        </div>
    );
}
