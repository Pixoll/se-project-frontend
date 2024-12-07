import { Link } from "react-router-dom";
import { BackButton } from "../components/BackButton";

export default function MedicHomePage() {
    return (
        <nav>
            <BackButton/>
            <Link to="/medic/schedule">Días de trabajo</Link>
        </nav>
    );
}
