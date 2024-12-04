import { Link } from "react-router-dom";

export default function MedicHomePage() {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            |
            <Link to="/medic/calendar">Calendario</Link>
            |
            <Link to="/medic/schedule">Días de trabajo</Link>
        </nav>
    );
}
