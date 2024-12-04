import { Link } from "react-router-dom";

export default function DoctorHomePage() {
    return (
        <nav>
            <Link to="/doctor/login">Inicio</Link>
            |
            <Link to="/doctor/calendar">Calendario</Link>
            |
            <Link to="/doctor/schedule">Días de trabajo</Link>
        </nav>
    );
}
